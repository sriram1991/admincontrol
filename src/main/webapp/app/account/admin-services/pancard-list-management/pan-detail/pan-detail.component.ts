import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../pancard-list-management.model';

@Component({
  selector: 'pan-detail',
  templateUrl: './pan-detail.component.html',
})
export class PanDetailComponent implements OnInit {
  user: User | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      this.user = user;
    });
  }
}
