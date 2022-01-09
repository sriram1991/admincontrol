import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStatusCategory, StatusCategory } from '../status-category.model';
import { StatusCategoryService } from '../service/status-category.service';

@Injectable({ providedIn: 'root' })
export class StatusCategoryRoutingResolveService implements Resolve<IStatusCategory> {
  constructor(protected service: StatusCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStatusCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((statusCategory: HttpResponse<StatusCategory>) => {
          if (statusCategory.body) {
            return of(statusCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StatusCategory());
  }
}
