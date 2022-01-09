import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPartyType } from '../party-type.model';
import { PartyTypeService } from '../service/party-type.service';

@Component({
  templateUrl: './party-type-delete-dialog.component.html',
})
export class PartyTypeDeleteDialogComponent {
  partyType?: IPartyType;

  constructor(protected partyTypeService: PartyTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.partyTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
