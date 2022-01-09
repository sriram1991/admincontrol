import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPostalAddress, PostalAddress } from '../postal-address.model';
import { PostalAddressService } from '../service/postal-address.service';

@Injectable({ providedIn: 'root' })
export class PostalAddressRoutingResolveService implements Resolve<IPostalAddress> {
  constructor(protected service: PostalAddressService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPostalAddress> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((postalAddress: HttpResponse<PostalAddress>) => {
          if (postalAddress.body) {
            return of(postalAddress.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PostalAddress());
  }
}
