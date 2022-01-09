import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PancardComponent } from './list/pancard.component';
import { PancardDetailComponent } from './detail/pancard-detail.component';
import { PancardUpdateComponent } from './update/pancard-update.component';
import { PancardDeleteDialogComponent } from './delete/pancard-delete-dialog.component';
import { PancardRoutingModule } from './route/pancard-routing.module';

@NgModule({
  imports: [SharedModule, PancardRoutingModule],
  declarations: [PancardComponent, PancardDetailComponent, PancardUpdateComponent, PancardDeleteDialogComponent],
  entryComponents: [PancardDeleteDialogComponent],
})
export class PancardModule {}
