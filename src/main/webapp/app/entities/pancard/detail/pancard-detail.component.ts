import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPancard } from '../pancard.model';

@Component({
  selector: 'sys-pancard-detail',
  templateUrl: './pancard-detail.component.html',
})
export class PancardDetailComponent implements OnInit {
  pancard: IPancard | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pancard }) => {
      this.pancard = pancard;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
