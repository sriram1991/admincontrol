import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PancardComponent } from './pancard.component';

export const pancardRoute: Route = {
  path: 'pancard',
  component: PancardComponent,
  data: {
    pageTitle: 'PANCard',
  },
  canActivate: [UserRouteAccessService],
};
