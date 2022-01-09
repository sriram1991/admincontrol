import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartyType } from '../party-type.model';

@Component({
  selector: 'sys-party-type-detail',
  templateUrl: './party-type-detail.component.html',
})
export class PartyTypeDetailComponent implements OnInit {
  partyType: IPartyType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ partyType }) => {
      this.partyType = partyType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
