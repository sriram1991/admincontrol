import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PartyTypeComponent } from './list/party-type.component';
import { PartyTypeDetailComponent } from './detail/party-type-detail.component';
import { PartyTypeUpdateComponent } from './update/party-type-update.component';
import { PartyTypeDeleteDialogComponent } from './delete/party-type-delete-dialog.component';
import { PartyTypeRoutingModule } from './route/party-type-routing.module';

@NgModule({
  imports: [SharedModule, PartyTypeRoutingModule],
  declarations: [PartyTypeComponent, PartyTypeDetailComponent, PartyTypeUpdateComponent, PartyTypeDeleteDialogComponent],
  entryComponents: [PartyTypeDeleteDialogComponent],
})
export class PartyTypeModule {}
