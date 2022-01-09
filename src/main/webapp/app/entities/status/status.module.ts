import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StatusComponent } from './list/status.component';
import { StatusDetailComponent } from './detail/status-detail.component';
import { StatusUpdateComponent } from './update/status-update.component';
import { StatusDeleteDialogComponent } from './delete/status-delete-dialog.component';
import { StatusRoutingModule } from './route/status-routing.module';

@NgModule({
  imports: [SharedModule, StatusRoutingModule],
  declarations: [StatusComponent, StatusDetailComponent, StatusUpdateComponent, StatusDeleteDialogComponent],
  entryComponents: [StatusDeleteDialogComponent],
})
export class StatusModule {}
