import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStatusCategory } from '../status-category.model';
import { StatusCategoryService } from '../service/status-category.service';

@Component({
  templateUrl: './status-category-delete-dialog.component.html',
})
export class StatusCategoryDeleteDialogComponent {
  statusCategory?: IStatusCategory;

  constructor(protected statusCategoryService: StatusCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.statusCategoryService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
