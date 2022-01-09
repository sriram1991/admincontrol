import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPostalAddress, getPostalAddressIdentifier } from '../postal-address.model';

export type EntityResponseType = HttpResponse<IPostalAddress>;
export type EntityArrayResponseType = HttpResponse<IPostalAddress[]>;

@Injectable({ providedIn: 'root' })
export class PostalAddressService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/postal-addresses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(postalAddress: IPostalAddress): Observable<EntityResponseType> {
    return this.http.post<IPostalAddress>(this.resourceUrl, postalAddress, { observe: 'response' });
  }

  update(postalAddress: IPostalAddress): Observable<EntityResponseType> {
    return this.http.put<IPostalAddress>(`${this.resourceUrl}/${getPostalAddressIdentifier(postalAddress) as number}`, postalAddress, {
      observe: 'response',
    });
  }

  partialUpdate(postalAddress: IPostalAddress): Observable<EntityResponseType> {
    return this.http.patch<IPostalAddress>(`${this.resourceUrl}/${getPostalAddressIdentifier(postalAddress) as number}`, postalAddress, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPostalAddress>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPostalAddress[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPostalAddressToCollectionIfMissing(
    postalAddressCollection: IPostalAddress[],
    ...postalAddressesToCheck: (IPostalAddress | null | undefined)[]
  ): IPostalAddress[] {
    const postalAddresses: IPostalAddress[] = postalAddressesToCheck.filter(isPresent);
    if (postalAddresses.length > 0) {
      const postalAddressCollectionIdentifiers = postalAddressCollection.map(
        postalAddressItem => getPostalAddressIdentifier(postalAddressItem)!
      );
      const postalAddressesToAdd = postalAddresses.filter(postalAddressItem => {
        const postalAddressIdentifier = getPostalAddressIdentifier(postalAddressItem);
        if (postalAddressIdentifier == null || postalAddressCollectionIdentifiers.includes(postalAddressIdentifier)) {
          return false;
        }
        postalAddressCollectionIdentifiers.push(postalAddressIdentifier);
        return true;
      });
      return [...postalAddressesToAdd, ...postalAddressCollection];
    }
    return postalAddressCollection;
  }
}
