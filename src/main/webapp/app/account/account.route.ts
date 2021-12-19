import { Routes } from '@angular/router';

import { activateRoute } from './activate/activate.route';
import { passwordRoute } from './password/password.route';
import { passwordResetFinishRoute } from './password-reset/finish/password-reset-finish.route';
import { passwordResetInitRoute } from './password-reset/init/password-reset-init.route';
import { registerRoute } from './register/register.route';
import { sessionsRoute } from './sessions/sessions.route';
import { settingsRoute } from './settings/settings.route';
import { pancardRoute } from './user-service/pancard/pancard.route';
import { Account } from 'app/core/auth/account.model';
import { UserManagementResolve, userManagementRoute } from 'app/admin/user-management/user-management.route';
import { UserManagementComponent } from 'app/admin/user-management/list/user-management.component';
import { UserManagementDetailComponent } from 'app/admin/user-management/detail/user-management-detail.component';
import { UserManagementUpdateComponent } from 'app/admin/user-management/update/user-management-update.component';
import { PanDetailManagementComponent } from './user-service/pan-detail-management/pan-detail-management.component';
import { PancardListManagementModule } from '../account/admin-services/pancard-list-management/pancard-list-management.module';

const ACCOUNT_ROUTES = [
  activateRoute,
  passwordRoute,
  passwordResetFinishRoute,
  passwordResetInitRoute,
  registerRoute,
  sessionsRoute,
  settingsRoute,
  // pancardRoute,
];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES,
  },
  {
    path: 'pancard-management',
    loadChildren: () =>
      import('../account/admin-services/pancard-list-management/pancard-list-management.module').then(m => m.PancardListManagementModule),
    data: {
      pageTitle: 'Pancards-List',
    },
  },
  {
    path: 'pancard-management-list',
    loadChildren: () => import('../account/user-service/pancard/pancard-mngmnt.module').then(m => m.PancardMngmntModule),
    data: {
      pageTitle: 'Pancard-request-list',
    },
  },
];
