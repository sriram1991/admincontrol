import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PanDetailComponent } from './pan-detail/pan-detail.component';
import { PanListComponent } from './pan-list/pan-list.component';
import { PanUpdateComponent } from './pan-update/pan-update.component';

import { User, IUser, IPancard } from './pancard-list-management.model';
import { PancardListManagementService } from './service/pancard-list-management.service';
// import { UserManagementComponent } from './list/user-management.component';
// import { UserManagementDetailComponent } from './detail/user-management-detail.component';
// import { UserManagementUpdateComponent } from './update/user-management-update.component';

@Injectable({ providedIn: 'root' })
export class PancardListManagement implements Resolve<IPancard> {
  constructor(private service: PancardListManagementService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPancard> {
    const id = route.params['id'];
    if (id) {
      return this.service.findPanById(id);
    }
    return of(new IPancard());
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
    path: 'view/:id',
    component: PanDetailComponent,
    resolve: {
      pancard: PancardListManagement,
    },
  },
  {
    path: 'new',
    component: PanUpdateComponent,
    resolve: {
      pancard: PancardListManagement,
    },
  },
  {
    path: 'edit/:id',
    component: PanUpdateComponent,
    resolve: {
      pancard: PancardListManagement,
    },
  },
];
