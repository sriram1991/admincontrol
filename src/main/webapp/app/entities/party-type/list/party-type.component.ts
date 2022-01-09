import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPartyType } from '../party-type.model';
import { PartyTypeService } from '../service/party-type.service';
import { PartyTypeDeleteDialogComponent } from '../delete/party-type-delete-dialog.component';

@Component({
  selector: 'sys-party-type',
  templateUrl: './party-type.component.html',
})
export class PartyTypeComponent implements OnInit {
  partyTypes?: IPartyType[];
  isLoading = false;

  constructor(protected partyTypeService: PartyTypeService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.partyTypeService.query().subscribe(
      (res: HttpResponse<IPartyType[]>) => {
        this.isLoading = false;
        this.partyTypes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPartyType): number {
    return item.id!;
  }

  delete(partyType: IPartyType): void {
    const modalRef = this.modalService.open(PartyTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.partyType = partyType;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
