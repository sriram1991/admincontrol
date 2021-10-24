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

const ACCOUNT_ROUTES = [
  activateRoute,
  passwordRoute,
  passwordResetFinishRoute,
  passwordResetInitRoute,
  registerRoute,
  sessionsRoute,
  settingsRoute,
  pancardRoute,
];

export const accountState: Routes = [
  {
    path: '',
    // component: Account,
    children: ACCOUNT_ROUTES,
  },
  {
    path: 'pancard-management',
    data: {
      defaultSort: 'id,asc',
    },
    component: UserManagementComponent,
  },
  {
    path: 'pancard-management/:login/view',
    component: UserManagementDetailComponent,
    resolve: {
      user: UserManagementResolve,
    },
  },
  {
    path: 'pancard-management/new',
    component: UserManagementUpdateComponent,
    resolve: {
      user: UserManagementResolve,
    },
  },
  {
    path: 'pancard-management/:login/edit',
    component: UserManagementUpdateComponent,
    resolve: {
      user: UserManagementResolve,
    },
  },
];
