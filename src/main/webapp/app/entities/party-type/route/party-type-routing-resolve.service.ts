import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPartyType, PartyType } from '../party-type.model';
import { PartyTypeService } from '../service/party-type.service';

@Injectable({ providedIn: 'root' })
export class PartyTypeRoutingResolveService implements Resolve<IPartyType> {
  constructor(protected service: PartyTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPartyType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((partyType: HttpResponse<PartyType>) => {
          if (partyType.body) {
            return of(partyType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PartyType());
  }
}
