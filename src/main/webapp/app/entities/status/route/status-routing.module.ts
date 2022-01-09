import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StatusComponent } from '../list/status.component';
import { StatusDetailComponent } from '../detail/status-detail.component';
import { StatusUpdateComponent } from '../update/status-update.component';
import { StatusRoutingResolveService } from './status-routing-resolve.service';

const statusRoute: Routes = [
  {
    path: '',
    component: StatusComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StatusDetailComponent,
    resolve: {
      status: StatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StatusUpdateComponent,
    resolve: {
      status: StatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StatusUpdateComponent,
    resolve: {
      status: StatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(statusRoute)],
  exports: [RouterModule],
})
export class StatusRoutingModule {}
