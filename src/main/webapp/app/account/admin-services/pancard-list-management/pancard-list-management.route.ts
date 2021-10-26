import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PanDetailComponent } from './pan-detail/pan-detail.component';
import { PanListComponent } from './pan-list/pan-list.component';
import { PanUpdateComponent } from './pan-update/pan-update.component';

import { User, IUser } from './pancard-list-management.model';
import { PancardListManagementService } from './service/pancard-list-management.service';
// import { UserManagementComponent } from './list/user-management.component';
// import { UserManagementDetailComponent } from './detail/user-management-detail.component';
// import { UserManagementUpdateComponent } from './update/user-management-update.component';

@Injectable({ providedIn: 'root' })
export class PancardListManagement implements Resolve<IUser> {
  constructor(private service: PancardListManagementService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
    const id = route.params['login'];
    if (id) {
      return this.service.find(id);
    }
    return of(new User());
  }
}

export const pancardListManagementRoute: Routes = [
  {
    path: '',
    component: PanListComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: ':login/view',
    component: PanDetailComponent,
    resolve: {
      user: PancardListManagement,
    },
  },
  {
    path: 'new',
    component: PanUpdateComponent,
    resolve: {
      user: PancardListManagement,
    },
  },
  {
    path: ':login/edit',
    component: PanUpdateComponent,
    resolve: {
      user: PancardListManagement,
    },
  },
];
