import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PostalAddressComponent } from '../list/postal-address.component';
import { PostalAddressDetailComponent } from '../detail/postal-address-detail.component';
import { PostalAddressUpdateComponent } from '../update/postal-address-update.component';
import { PostalAddressRoutingResolveService } from './postal-address-routing-resolve.service';

const postalAddressRoute: Routes = [
  {
    path: '',
    component: PostalAddressComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PostalAddressDetailComponent,
    resolve: {
      postalAddress: PostalAddressRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PostalAddressUpdateComponent,
    resolve: {
      postalAddress: PostalAddressRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PostalAddressUpdateComponent,
    resolve: {
      postalAddress: PostalAddressRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(postalAddressRoute)],
  exports: [RouterModule],
})
export class PostalAddressRoutingModule {}
