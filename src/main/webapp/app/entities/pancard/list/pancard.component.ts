import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPancard } from '../pancard.model';
import { PancardService } from '../service/pancard.service';
import { PancardDeleteDialogComponent } from '../delete/pancard-delete-dialog.component';

@Component({
  selector: 'sys-pancard',
  templateUrl: './pancard.component.html',
})
export class PancardComponent implements OnInit {
  pancards?: IPancard[];
  isLoading = false;

  constructor(protected pancardService: PancardService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.pancardService.query().subscribe(
      (res: HttpResponse<IPancard[]>) => {
        this.isLoading = false;
        this.pancards = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPancard): number {
    return item.id!;
  }

  delete(pancard: IPancard): void {
    const modalRef = this.modalService.open(PancardDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pancard = pancard;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
