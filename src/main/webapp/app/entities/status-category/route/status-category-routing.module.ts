import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StatusCategoryComponent } from '../list/status-category.component';
import { StatusCategoryDetailComponent } from '../detail/status-category-detail.component';
import { StatusCategoryUpdateComponent } from '../update/status-category-update.component';
import { StatusCategoryRoutingResolveService } from './status-category-routing-resolve.service';

const statusCategoryRoute: Routes = [
  {
    path: '',
    component: StatusCategoryComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StatusCategoryDetailComponent,
    resolve: {
      statusCategory: StatusCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StatusCategoryUpdateComponent,
    resolve: {
      statusCategory: StatusCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StatusCategoryUpdateComponent,
    resolve: {
      statusCategory: StatusCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(statusCategoryRoute)],
  exports: [RouterModule],
})
export class StatusCategoryRoutingModule {}
