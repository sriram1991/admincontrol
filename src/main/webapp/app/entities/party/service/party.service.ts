import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IParty, getPartyIdentifier } from '../party.model';

export type EntityResponseType = HttpResponse<IParty>;
export type EntityArrayResponseType = HttpResponse<IParty[]>;

@Injectable({ providedIn: 'root' })
export class PartyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/parties');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(party: IParty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(party);
    return this.http
      .post<IParty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(party: IParty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(party);
    return this.http
      .put<IParty>(`${this.resourceUrl}/${getPartyIdentifier(party) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(party: IParty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(party);
    return this.http
      .patch<IParty>(`${this.resourceUrl}/${getPartyIdentifier(party) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IParty>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParty[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPartyToCollectionIfMissing(partyCollection: IParty[], ...partiesToCheck: (IParty | null | undefined)[]): IParty[] {
    const parties: IParty[] = partiesToCheck.filter(isPresent);
    if (parties.length > 0) {
      const partyCollectionIdentifiers = partyCollection.map(partyItem => getPartyIdentifier(partyItem)!);
      const partiesToAdd = parties.filter(partyItem => {
        const partyIdentifier = getPartyIdentifier(partyItem);
        if (partyIdentifier == null || partyCollectionIdentifiers.includes(partyIdentifier)) {
          return false;
        }
        partyCollectionIdentifiers.push(partyIdentifier);
        return true;
      });
      return [...partiesToAdd, ...partyCollection];
    }
    return partyCollection;
  }

  protected convertDateFromClient(party: IParty): IParty {
    return Object.assign({}, party, {
      birthDate: party.birthDate?.isValid() ? party.birthDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthDate = res.body.birthDate ? dayjs(res.body.birthDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((party: IParty) => {
        party.birthDate = party.birthDate ? dayjs(party.birthDate) : undefined;
      });
    }
    return res;
  }
}
