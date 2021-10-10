import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementService } from 'app/admin/user-management/service/user-management.service';
import { User } from 'app/admin/user-management/user-management.model';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'jhi-pan-detail-management',
  templateUrl: './pan-detail-management.component.html',
  styleUrls: ['./pan-detail-management.component.scss'],
})
export class PanDetailManagementComponent implements OnInit {
  currentAccount: Account | null = null;
  users: User[] | null = null;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;

  constructor(
    private userService: UserManagementService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.handleNavigation();
  }

  setActive(user: User, isActivated: boolean): void {
    // this.userService.update({ ...user, activated: isActivated }).subscribe(() => this.loadAll());
    this.loadAll();
  }

  trackIdentity(index: number, item: User): number {
    // it returns no of details for listing
    return 2;
  }

  deleteUser(user: User): void {
    const modalRef = this.modalService.open('UserManagementDeleteDialogComponent', { size: 'lg', backdrop: 'static' });
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  loadAll(): void {
    this.isLoading = true;
    this.isLoading = false;
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

  private onSuccess(users: User[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.users = users;
  }
}
