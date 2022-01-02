import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pancard } from 'app/account/admin-services/pancard-list-management/pancard-list-management.model';
// import { User } from 'app/admin/user-management/user-management.model';
import { PancardMngmntService } from '../service/pancard-mngmnt.service';

@Component({
  selector: 'pancard-mngmnt-update',
  templateUrl: './pancard-mngmnt-update.component.html',
  styleUrls: ['./pancard-mngmnt-update.component.scss'],
})
export class PancardMngmntUpdateComponent implements OnInit {
  user!: Pancard;
  authorities: string[] = [];
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    firstName: ['', [Validators.maxLength(50)]],
    lastName: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [],
    langKey: [],
    authorities: [],
  });

  constructor(private userService: PancardMngmntService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.user = user;
        if (this.user.id === undefined) {
          // this.user.activated = true;
        }
        this.updateForm(user);
      }
    });
    this.userService.authorities().subscribe(authorities => (this.authorities = authorities));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.updateUser(this.user);
    if (this.user.id !== undefined) {
      this.userService.update(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      // this.user.langKey = 'en';
      this.userService.create(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private updateForm(user: Pancard): void {
    this.editForm.patchValue({
      id: user.id,
      login: user.email,
      firstName: user.mobile,
      lastName: user.panid,
      email: user.address,
      activated: user.dob,
      langKey: user.aadhaarno,
      authorities: user.nameasaadhaar,
    });
  }

  private updateUser(user: Pancard): void {
    user.email = this.editForm.get(['email'])!.value;
    user.mobile = this.editForm.get(['mobile'])!.value;
    user.panid = this.editForm.get(['panid'])!.value;
    user.address = this.editForm.get(['address'])!.value;
    user.dob = this.editForm.get(['dob'])!.value;
    user.aadhaarno = this.editForm.get(['aadhaarno'])!.value;
    user.nameasaadhaar = this.editForm.get(['nameasaadhaar'])!.value;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
}
