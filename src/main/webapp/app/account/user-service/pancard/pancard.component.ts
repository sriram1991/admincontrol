import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-pancard',
  templateUrl: './pancard.component.html',
  styleUrls: ['./pancard.component.scss'],
})
export class PancardComponent implements OnInit {
  pantitle = '';
  success = false;
  pancardForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor(private accountService: AccountService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pantitle = 'Your Pancard details ';
  }

  submitPancard(): void {
    this.pancardForm.get(['password'])!.value;
    this.success = true;
  }
}
