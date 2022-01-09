import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PartyTypeComponent } from '../list/party-type.component';
import { PartyTypeDetailComponent } from '../detail/party-type-detail.component';
import { PartyTypeUpdateComponent } from '../update/party-type-update.component';
import { PartyTypeRoutingResolveService } from './party-type-routing-resolve.service';

const partyTypeRoute: Routes = [
  {
    path: '',
    component: PartyTypeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PartyTypeDetailComponent,
    resolve: {
      partyType: PartyTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PartyTypeUpdateComponent,
    resolve: {
      partyType: PartyTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PartyTypeUpdateComponent,
    resolve: {
      partyType: PartyTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(partyTypeRoute)],
  exports: [RouterModule],
})
export class PartyTypeRoutingModule {}
