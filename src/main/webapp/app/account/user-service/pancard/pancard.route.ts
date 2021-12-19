import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Route, Routes } from '@angular/router';
import { IUser } from 'app/account/admin-services/pancard-list-management/pancard-list-management.model';
import { Observable, of } from 'rxjs';
import { PancardMngmntDetailComponent } from './detail/pancard-mngmnt-detail.component';
import { PancardMngmntComponent } from './list/pancard-mngmnt.component';
import { User } from './pancard-mngmnt.model';
import { PancardMngmntService } from './service/pancard-mngmnt.service';
import { PancardMngmntUpdateComponent } from './update/pancard-mngmnt-update.component';

@Injectable({ providedIn: 'root' })
export class PancardManagementResolve implements Resolve<IUser> {
  constructor(private service: PancardMngmntService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
    const id = route.params['login'];
    if (id) {
      return this.service.find(id);
    }
    return of(new User());
  }
}

export const pancardRoute: Routes = [
  {
    path: '',
    component: PancardMngmntComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: ':login/view',
    component: PancardMngmntDetailComponent,
    resolve: {
      user: PancardManagementResolve,
    },
  },
  {
    path: 'new',
    component: PancardMngmntUpdateComponent,
    resolve: {
      user: PancardManagementResolve,
    },
  },
  {
    path: ':login/edit',
    component: PancardMngmntUpdateComponent,
    resolve: {
      user: PancardManagementResolve,
    },
  },
];
