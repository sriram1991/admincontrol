import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPancard, getPancardIdentifier } from '../pancard.model';

export type EntityResponseType = HttpResponse<IPancard>;
export type EntityArrayResponseType = HttpResponse<IPancard[]>;

@Injectable({ providedIn: 'root' })
export class PancardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pancards');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pancard: IPancard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pancard);
    return this.http
      .post<IPancard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pancard: IPancard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pancard);
    return this.http
      .put<IPancard>(`${this.resourceUrl}/${getPancardIdentifier(pancard) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(pancard: IPancard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pancard);
    return this.http
      .patch<IPancard>(`${this.resourceUrl}/${getPancardIdentifier(pancard) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPancard>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPancard[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPancardToCollectionIfMissing(pancardCollection: IPancard[], ...pancardsToCheck: (IPancard | null | undefined)[]): IPancard[] {
    const pancards: IPancard[] = pancardsToCheck.filter(isPresent);
    if (pancards.length > 0) {
      const pancardCollectionIdentifiers = pancardCollection.map(pancardItem => getPancardIdentifier(pancardItem)!);
      const pancardsToAdd = pancards.filter(pancardItem => {
        const pancardIdentifier = getPancardIdentifier(pancardItem);
        if (pancardIdentifier == null || pancardCollectionIdentifiers.includes(pancardIdentifier)) {
          return false;
        }
        pancardCollectionIdentifiers.push(pancardIdentifier);
        return true;
      });
      return [...pancardsToAdd, ...pancardCollection];
    }
    return pancardCollection;
  }

  protected convertDateFromClient(pancard: IPancard): IPancard {
    return Object.assign({}, pancard, {
      birthDate: pancard.birthDate?.isValid() ? pancard.birthDate.format(DATE_FORMAT) : undefined,
      createdAt: pancard.createdAt?.isValid() ? pancard.createdAt.toJSON() : undefined,
      updatedAt: pancard.updatedAt?.isValid() ? pancard.updatedAt.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthDate = res.body.birthDate ? dayjs(res.body.birthDate) : undefined;
      res.body.createdAt = res.body.createdAt ? dayjs(res.body.createdAt) : undefined;
      res.body.updatedAt = res.body.updatedAt ? dayjs(res.body.updatedAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pancard: IPancard) => {
        pancard.birthDate = pancard.birthDate ? dayjs(pancard.birthDate) : undefined;
        pancard.createdAt = pancard.createdAt ? dayjs(pancard.createdAt) : undefined;
        pancard.updatedAt = pancard.updatedAt ? dayjs(pancard.updatedAt) : undefined;
      });
    }
    return res;
  }
}
