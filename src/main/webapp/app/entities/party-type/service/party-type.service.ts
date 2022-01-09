import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPartyType, getPartyTypeIdentifier } from '../party-type.model';

export type EntityResponseType = HttpResponse<IPartyType>;
export type EntityArrayResponseType = HttpResponse<IPartyType[]>;

@Injectable({ providedIn: 'root' })
export class PartyTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/party-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(partyType: IPartyType): Observable<EntityResponseType> {
    return this.http.post<IPartyType>(this.resourceUrl, partyType, { observe: 'response' });
  }

  update(partyType: IPartyType): Observable<EntityResponseType> {
    return this.http.put<IPartyType>(`${this.resourceUrl}/${getPartyTypeIdentifier(partyType) as number}`, partyType, {
      observe: 'response',
    });
  }

  partialUpdate(partyType: IPartyType): Observable<EntityResponseType> {
    return this.http.patch<IPartyType>(`${this.resourceUrl}/${getPartyTypeIdentifier(partyType) as number}`, partyType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPartyType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPartyType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPartyTypeToCollectionIfMissing(
    partyTypeCollection: IPartyType[],
    ...partyTypesToCheck: (IPartyType | null | undefined)[]
  ): IPartyType[] {
    const partyTypes: IPartyType[] = partyTypesToCheck.filter(isPresent);
    if (partyTypes.length > 0) {
      const partyTypeCollectionIdentifiers = partyTypeCollection.map(partyTypeItem => getPartyTypeIdentifier(partyTypeItem)!);
      const partyTypesToAdd = partyTypes.filter(partyTypeItem => {
        const partyTypeIdentifier = getPartyTypeIdentifier(partyTypeItem);
        if (partyTypeIdentifier == null || partyTypeCollectionIdentifiers.includes(partyTypeIdentifier)) {
          return false;
        }
        partyTypeCollectionIdentifiers.push(partyTypeIdentifier);
        return true;
      });
      return [...partyTypesToAdd, ...partyTypeCollection];
    }
    return partyTypeCollection;
  }
}
