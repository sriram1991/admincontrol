import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-pancard',
  templateUrl: './pancard.component.html',
  styleUrls: ['./pancard.component.scss'],
})
export class PancardComponent implements OnInit {
  component = 'null';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.component = 'Replace this text to create the PAN card service ';
  }
}
