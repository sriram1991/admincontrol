import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PancardComponent } from '../list/pancard.component';
import { PancardDetailComponent } from '../detail/pancard-detail.component';
import { PancardUpdateComponent } from '../update/pancard-update.component';
import { PancardRoutingResolveService } from './pancard-routing-resolve.service';

const pancardRoute: Routes = [
  {
    path: '',
    component: PancardComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PancardDetailComponent,
    resolve: {
      pancard: PancardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PancardUpdateComponent,
    resolve: {
      pancard: PancardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PancardUpdateComponent,
    resolve: {
      pancard: PancardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pancardRoute)],
  exports: [RouterModule],
})
export class PancardRoutingModule {}
