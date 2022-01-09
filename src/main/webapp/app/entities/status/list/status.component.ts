import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStatus } from '../status.model';
import { StatusService } from '../service/status.service';
import { StatusDeleteDialogComponent } from '../delete/status-delete-dialog.component';

@Component({
  selector: 'sys-status',
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit {
  statuses?: IStatus[];
  isLoading = false;

  constructor(protected statusService: StatusService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.statusService.query().subscribe(
      (res: HttpResponse<IStatus[]>) => {
        this.isLoading = false;
        this.statuses = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IStatus): number {
    return item.id!;
  }

  delete(status: IStatus): void {
    const modalRef = this.modalService.open(StatusDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.status = status;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
