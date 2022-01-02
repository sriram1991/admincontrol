import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPancard, Pancard } from '../pancard-list-management.model';

@Component({
  selector: 'pan-detail',
  templateUrl: './pan-detail.component.html',
})
export class PanDetailComponent implements OnInit {
  user: Pancard | null = null;
  panDetails: IPancard | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ pancard }) => {
      // this.user = user;
      this.panDetails = pancard;
      console.log('pancard comming::', pancard);
    });
  }
}
