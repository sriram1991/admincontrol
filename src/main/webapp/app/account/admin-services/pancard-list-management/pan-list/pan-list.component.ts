import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { PancardListManagementService } from '../service/pancard-list-management.service';
import { IPancard, User, IUserLogin } from '../pancard-list-management.model';
import { PanDeleteComponent } from '../pan-delete/pan-delete.component';

@Component({
  selector: 'pan-list',
  templateUrl: './pan-list.component.html',
})
export class PanListComponent implements OnInit {
  currentAccount: Account | null = null;
  users: User[] | null = null;
  userLogin: IUserLogin = { user: '' };
  pans: any[] | null = null;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  currentDate: Date = new Date();

  constructor(
    private userService: PancardListManagementService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    console.log(this.currentAccount);
    this.haddleLoginUserDetails();
    this.handleNavigation();
  }
  haddleLoginUserDetails(): void {
    this.currentAccount?.login === 'admin' ? (this.userLogin.user = 'admin') : (this.userLogin.user = 'user');
  }

  setActive(user: User, isActivated: boolean): void {
    this.userService.update({ ...user, activated: isActivated }).subscribe(() => this.loadAll());
  }

  trackIdentity(index: number, item: User): number {
    return item.id!;
  }

  deleteUser(user: IPancard): void {
    console.log(user);

    const modalRef = this.modalService.open(PanDeleteComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pancard = user;
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
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IPancard[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        () => (this.isLoading = false)
      );
  }

  loadPanList(): void {
    this.isLoading = true;
    this.userService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
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
      // this.loadAll();
      this.loadPanList();
    });
  }

  private sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(panlist: IPancard[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    // this.users = users;
    console.log(panlist);
    this.pans = panlist;
  }
}
