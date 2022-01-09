import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPancard, Pancard } from '../pancard.model';
import { PancardService } from '../service/pancard.service';

@Injectable({ providedIn: 'root' })
export class PancardRoutingResolveService implements Resolve<IPancard> {
  constructor(protected service: PancardService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPancard> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pancard: HttpResponse<Pancard>) => {
          if (pancard.body) {
            return of(pancard.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pancard());
  }
}
