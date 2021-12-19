import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PancardMngmntDeleteDialogComponent } from './delete/pancard-mngmnt-delete-dialog.component';
import { PancardMngmntDetailComponent } from './detail/pancard-mngmnt-detail.component';
import { PancardMngmntComponent } from './list/pancard-mngmnt.component';
import { PancardMngmntUpdateComponent } from './update/pancard-mngmnt-update.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { pancardRoute } from './pancard.route';
@NgModule({
  imports: [SharedModule, RouterModule.forChild(pancardRoute)],
  declarations: [PancardMngmntDeleteDialogComponent, PancardMngmntDetailComponent, PancardMngmntComponent, PancardMngmntUpdateComponent],
  entryComponents: [PancardMngmntDeleteDialogComponent],
})
export class PancardMngmntModule {}
