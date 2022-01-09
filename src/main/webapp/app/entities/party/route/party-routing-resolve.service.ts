import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IParty, Party } from '../party.model';
import { PartyService } from '../service/party.service';

@Injectable({ providedIn: 'root' })
export class PartyRoutingResolveService implements Resolve<IParty> {
  constructor(protected service: PartyService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParty> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((party: HttpResponse<Party>) => {
          if (party.body) {
            return of(party.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Party());
  }
}
