import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PostalAddressComponent } from './list/postal-address.component';
import { PostalAddressDetailComponent } from './detail/postal-address-detail.component';
import { PostalAddressUpdateComponent } from './update/postal-address-update.component';
import { PostalAddressDeleteDialogComponent } from './delete/postal-address-delete-dialog.component';
import { PostalAddressRoutingModule } from './route/postal-address-routing.module';

@NgModule({
  imports: [SharedModule, PostalAddressRoutingModule],
  declarations: [PostalAddressComponent, PostalAddressDetailComponent, PostalAddressUpdateComponent, PostalAddressDeleteDialogComponent],
  entryComponents: [PostalAddressDeleteDialogComponent],
})
export class PostalAddressModule {}
