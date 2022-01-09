import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStatus } from '../status.model';
import { StatusService } from '../service/status.service';

@Component({
  templateUrl: './status-delete-dialog.component.html',
})
export class StatusDeleteDialogComponent {
  status?: IStatus;

  constructor(protected statusService: StatusService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.statusService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
