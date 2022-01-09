import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPostalAddress } from '../postal-address.model';
import { PostalAddressService } from '../service/postal-address.service';

@Component({
  templateUrl: './postal-address-delete-dialog.component.html',
})
export class PostalAddressDeleteDialogComponent {
  postalAddress?: IPostalAddress;

  constructor(protected postalAddressService: PostalAddressService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.postalAddressService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
