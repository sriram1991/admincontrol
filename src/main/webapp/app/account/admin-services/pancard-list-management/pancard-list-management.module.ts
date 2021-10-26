import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PanListComponent } from './pan-list/pan-list.component';
import { PanUpdateComponent } from './pan-update/pan-update.component';
import { PanDeleteComponent } from './pan-delete/pan-delete.component';
import { pancardRoute } from 'app/account/user-service/pancard/pancard.route';
import { pancardListManagementRoute } from './pancard-list-management.route';
import { PanDetailComponent } from './pan-detail/pan-detail.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(pancardListManagementRoute)],
  declarations: [PanListComponent, PanDetailComponent, PanUpdateComponent, PanDeleteComponent],
  entryComponents: [PanDeleteComponent],
})
export class PancardListManagementModule {}
