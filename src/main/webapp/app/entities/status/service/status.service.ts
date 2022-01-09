import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStatus, getStatusIdentifier } from '../status.model';

export type EntityResponseType = HttpResponse<IStatus>;
export type EntityArrayResponseType = HttpResponse<IStatus[]>;

@Injectable({ providedIn: 'root' })
export class StatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(status: IStatus): Observable<EntityResponseType> {
    return this.http.post<IStatus>(this.resourceUrl, status, { observe: 'response' });
  }

  update(status: IStatus): Observable<EntityResponseType> {
    return this.http.put<IStatus>(`${this.resourceUrl}/${getStatusIdentifier(status) as number}`, status, { observe: 'response' });
  }

  partialUpdate(status: IStatus): Observable<EntityResponseType> {
    return this.http.patch<IStatus>(`${this.resourceUrl}/${getStatusIdentifier(status) as number}`, status, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addStatusToCollectionIfMissing(statusCollection: IStatus[], ...statusesToCheck: (IStatus | null | undefined)[]): IStatus[] {
    const statuses: IStatus[] = statusesToCheck.filter(isPresent);
    if (statuses.length > 0) {
      const statusCollectionIdentifiers = statusCollection.map(statusItem => getStatusIdentifier(statusItem)!);
      const statusesToAdd = statuses.filter(statusItem => {
        const statusIdentifier = getStatusIdentifier(statusItem);
        if (statusIdentifier == null || statusCollectionIdentifiers.includes(statusIdentifier)) {
          return false;
        }
        statusCollectionIdentifiers.push(statusIdentifier);
        return true;
      });
      return [...statusesToAdd, ...statusCollection];
    }
    return statusCollection;
  }
}
