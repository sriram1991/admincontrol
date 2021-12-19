import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/admin/user-management/user-management.model';

@Component({
  selector: 'pancard-mngmnt-detail',
  templateUrl: './pancard-mngmnt-detail.component.html',
  styleUrls: ['./pancard-mngmnt-detail.component.scss'],
})
export class PancardMngmntDetailComponent implements OnInit {
  user: User | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      this.user = user;
    });
  }
}
