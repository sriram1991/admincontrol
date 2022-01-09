import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PartyComponent } from './list/party.component';
import { PartyDetailComponent } from './detail/party-detail.component';
import { PartyUpdateComponent } from './update/party-update.component';
import { PartyDeleteDialogComponent } from './delete/party-delete-dialog.component';
import { PartyRoutingModule } from './route/party-routing.module';

@NgModule({
  imports: [SharedModule, PartyRoutingModule],
  declarations: [PartyComponent, PartyDetailComponent, PartyUpdateComponent, PartyDeleteDialogComponent],
  entryComponents: [PartyDeleteDialogComponent],
})
export class PartyModule {}
