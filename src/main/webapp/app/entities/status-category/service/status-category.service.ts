import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStatusCategory, getStatusCategoryIdentifier } from '../status-category.model';

export type EntityResponseType = HttpResponse<IStatusCategory>;
export type EntityArrayResponseType = HttpResponse<IStatusCategory[]>;

@Injectable({ providedIn: 'root' })
export class StatusCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/status-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(statusCategory: IStatusCategory): Observable<EntityResponseType> {
    return this.http.post<IStatusCategory>(this.resourceUrl, statusCategory, { observe: 'response' });
  }

  update(statusCategory: IStatusCategory): Observable<EntityResponseType> {
    return this.http.put<IStatusCategory>(`${this.resourceUrl}/${getStatusCategoryIdentifier(statusCategory) as number}`, statusCategory, {
      observe: 'response',
    });
  }

  partialUpdate(statusCategory: IStatusCategory): Observable<EntityResponseType> {
    return this.http.patch<IStatusCategory>(
      `${this.resourceUrl}/${getStatusCategoryIdentifier(statusCategory) as number}`,
      statusCategory,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStatusCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStatusCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addStatusCategoryToCollectionIfMissing(
    statusCategoryCollection: IStatusCategory[],
    ...statusCategoriesToCheck: (IStatusCategory | null | undefined)[]
  ): IStatusCategory[] {
    const statusCategories: IStatusCategory[] = statusCategoriesToCheck.filter(isPresent);
    if (statusCategories.length > 0) {
      const statusCategoryCollectionIdentifiers = statusCategoryCollection.map(
        statusCategoryItem => getStatusCategoryIdentifier(statusCategoryItem)!
      );
      const statusCategoriesToAdd = statusCategories.filter(statusCategoryItem => {
        const statusCategoryIdentifier = getStatusCategoryIdentifier(statusCategoryItem);
        if (statusCategoryIdentifier == null || statusCategoryCollectionIdentifiers.includes(statusCategoryIdentifier)) {
          return false;
        }
        statusCategoryCollectionIdentifiers.push(statusCategoryIdentifier);
        return true;
      });
      return [...statusCategoriesToAdd, ...statusCategoryCollection];
    }
    return statusCategoryCollection;
  }
}
