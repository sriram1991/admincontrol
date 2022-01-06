import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPancard, Pancard } from 'app/account/admin-services/pancard-list-management/pancard-list-management.model';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { combineLatest } from 'rxjs';
import { PancardMngmntDeleteDialogComponent } from '../delete/pancard-mngmnt-delete-dialog.component';
import { PancardMngmntService } from '../service/pancard-mngmnt.service';

@Component({
  selector: 'pancard-mngmnt',
  templateUrl: './pancard-mngmnt.component.html',
  styleUrls: ['./pancard-mngmnt.component.scss'],
})
export class PancardMngmntComponent implements OnInit {
  currentAccount: Account | null = null;
  users: Pancard[] | null = null;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;

  constructor(
    private userService: PancardMngmntService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.handleNavigation();
  }

  setActive(user: Pancard, isActivated: boolean): void {
    this.userService.update({ ...user }).subscribe(() => this.loadAll());
  }

  trackIdentity(index: number, item: Pancard): number {
    return item.id!;
  }

  deleteUser(user: Pancard): void {
    const modalRef = this.modalService.open(PancardMngmntDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = user;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  loadAll(): void {
    this.isLoading = true;
    this.userService
      .query({
        // page: this.page - 1,
        // size: this.itemsPerPage,
        // sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IPancard[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        () => (this.isLoading = false)
      );
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
      },
    });
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      this.page = page !== null ? +page : 1;
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC;
      this.loadAll();
    });
  }

  private sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(users: IPancard[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.users = users;
    console.log('user-pancard :: ');
    console.log(this.users);
  }
}
