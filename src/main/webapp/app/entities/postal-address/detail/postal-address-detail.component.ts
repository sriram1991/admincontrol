import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPostalAddress } from '../postal-address.model';

@Component({
  selector: 'sys-postal-address-detail',
  templateUrl: './postal-address-detail.component.html',
})
export class PostalAddressDetailComponent implements OnInit {
  postalAddress: IPostalAddress | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ postalAddress }) => {
      this.postalAddress = postalAddress;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
