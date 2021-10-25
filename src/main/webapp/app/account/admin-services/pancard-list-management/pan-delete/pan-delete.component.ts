import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../pancard-list-management.model';
import { PancardListManagementService } from '../service/pancard-list-management.service';

@Component({
  selector: 'jhi-pan-delete',
  templateUrl: './pan-delete.component.html',
})
export class PanDeleteComponent implements OnInit {
  user?: User;

  constructor(private panService: PancardListManagementService, private activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(login: string): void {
    this.panService.delete(login).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
