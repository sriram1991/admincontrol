import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementService } from 'app/admin/user-management/service/user-management.service';
import { User } from 'app/admin/user-management/user-management.model';

@Component({
  selector: 'pancard-mngmnt-delete-dialog',
  templateUrl: './pancard-mngmnt-delete-dialog.component.html',
  styleUrls: ['./pancard-mngmnt-delete-dialog.component.scss'],
})
export class PancardMngmntDeleteDialogComponent implements OnInit {
  user?: User;

  constructor(private userService: UserManagementService, private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(login: string): void {
    this.userService.delete(login).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
