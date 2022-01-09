import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PartyComponent } from '../list/party.component';
import { PartyDetailComponent } from '../detail/party-detail.component';
import { PartyUpdateComponent } from '../update/party-update.component';
import { PartyRoutingResolveService } from './party-routing-resolve.service';

const partyRoute: Routes = [
  {
    path: '',
    component: PartyComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PartyDetailComponent,
    resolve: {
      party: PartyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PartyUpdateComponent,
    resolve: {
      party: PartyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PartyUpdateComponent,
    resolve: {
      party: PartyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(partyRoute)],
  exports: [RouterModule],
})
export class PartyRoutingModule {}
