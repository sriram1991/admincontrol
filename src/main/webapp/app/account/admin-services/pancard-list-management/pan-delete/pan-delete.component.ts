import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { IPancard } from '../pancard-list-management.model';
import { PancardListManagementService } from '../service/pancard-list-management.service';

@Component({
  selector: 'pan-delete',
  templateUrl: './pan-delete.component.html',
})
export class PanDeleteComponent implements OnInit {
  currentAccount: Account | null = null;
  pancard?: string;

  constructor(
    private panService: PancardListManagementService,
    private accountService: AccountService,
    private activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    console.log(this.currentAccount);
    // throw new Error('Method not implemented.');
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(login: any): void {
    // console.log(login["id"]);
    this.panService.delete(login['id']).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
