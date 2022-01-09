import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStatusCategory } from '../status-category.model';
import { StatusCategoryService } from '../service/status-category.service';
import { StatusCategoryDeleteDialogComponent } from '../delete/status-category-delete-dialog.component';

@Component({
  selector: 'sys-status-category',
  templateUrl: './status-category.component.html',
})
export class StatusCategoryComponent implements OnInit {
  statusCategories?: IStatusCategory[];
  isLoading = false;

  constructor(protected statusCategoryService: StatusCategoryService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.statusCategoryService.query().subscribe(
      (res: HttpResponse<IStatusCategory[]>) => {
        this.isLoading = false;
        this.statusCategories = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IStatusCategory): number {
    return item.id!;
  }

  delete(statusCategory: IStatusCategory): void {
    const modalRef = this.modalService.open(StatusCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.statusCategory = statusCategory;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
