import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPancard } from '../pancard.model';
import { PancardService } from '../service/pancard.service';

@Component({
  templateUrl: './pancard-delete-dialog.component.html',
})
export class PancardDeleteDialogComponent {
  pancard?: IPancard;

  constructor(protected pancardService: PancardService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pancardService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
