import { Route, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PanDetailManagementComponent } from '../pan-detail-management/pan-detail-management.component';
import { PancardComponent } from './pancard.component';

export const pancardRoute: Route = {
  path: 'pancardDetailManagement',
  component: PanDetailManagementComponent,
  canActivate: [UserRouteAccessService],
  // resolve: {
  // user: UserManagementResolve,
  // }
};
