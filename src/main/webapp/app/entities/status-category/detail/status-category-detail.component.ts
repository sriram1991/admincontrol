import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStatusCategory } from '../status-category.model';

@Component({
  selector: 'sys-status-category-detail',
  templateUrl: './status-category-detail.component.html',
})
export class StatusCategoryDetailComponent implements OnInit {
  statusCategory: IStatusCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ statusCategory }) => {
      this.statusCategory = statusCategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
