import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPostalAddress } from '../postal-address.model';
import { PostalAddressService } from '../service/postal-address.service';
import { PostalAddressDeleteDialogComponent } from '../delete/postal-address-delete-dialog.component';

@Component({
  selector: 'sys-postal-address',
  templateUrl: './postal-address.component.html',
})
export class PostalAddressComponent implements OnInit {
  postalAddresses?: IPostalAddress[];
  isLoading = false;

  constructor(protected postalAddressService: PostalAddressService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.postalAddressService.query().subscribe(
      (res: HttpResponse<IPostalAddress[]>) => {
        this.isLoading = false;
        this.postalAddresses = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPostalAddress): number {
    return item.id!;
  }

  delete(postalAddress: IPostalAddress): void {
    const modalRef = this.modalService.open(PostalAddressDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.postalAddress = postalAddress;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
