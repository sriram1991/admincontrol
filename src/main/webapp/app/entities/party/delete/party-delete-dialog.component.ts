import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IParty } from '../party.model';
import { PartyService } from '../service/party.service';

@Component({
  templateUrl: './party-delete-dialog.component.html',
})
export class PartyDeleteDialogComponent {
  party?: IParty;

  constructor(protected partyService: PartyService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.partyService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
