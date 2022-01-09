import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStatus, Status } from '../status.model';
import { StatusService } from '../service/status.service';

@Injectable({ providedIn: 'root' })
export class StatusRoutingResolveService implements Resolve<IStatus> {
  constructor(protected service: StatusService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStatus> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((status: HttpResponse<Status>) => {
          if (status.body) {
            return of(status.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Status());
  }
}
