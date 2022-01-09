import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParty } from '../party.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'sys-party-detail',
  templateUrl: './party-detail.component.html',
})
export class PartyDetailComponent implements OnInit {
  party: IParty | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ party }) => {
      this.party = party;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
