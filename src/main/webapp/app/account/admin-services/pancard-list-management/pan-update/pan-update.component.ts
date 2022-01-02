import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { IPancard, User } from '../pancard-list-management.model';
import { PancardListManagementService } from '../service/pancard-list-management.service';

@Component({
  selector: 'pan-update',
  templateUrl: './pan-update.component.html',
})
export class PanUpdateComponent implements OnInit {
  user!: User;
  pancard!: IPancard;
  authorities: string[] = [];
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    // login: [
    //   '',
    //   [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(50),
    //     Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
    //   ],
    // ],
    email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    nameasaadhaar: ['', [Validators.maxLength(12)]],
    adhaarno: [''],
    panid: [],
    panstatus: [''],
    dob: [''],
    address: [''],
  });

  constructor(private userService: PancardListManagementService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ pancard }) => {
      if (pancard) {
        // this.user = user;
        this.pancard = pancard;
        if (this.pancard.id === undefined) {
          // this.pancard.panstatus = 'INACTIVE';
        }
        this.updateForm(pancard);
      }
    });
    this.userService.authorities().subscribe(authorities => (this.authorities = authorities));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.updateUser(this.pancard);
    if (this.pancard.id !== undefined) {
      this.userService.update(this.pancard).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      // this.user.langKey = 'en';
      console.log('payload::', this.pancard);
      this.userService.createPancard(this.pancard).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private updateForm(pancard: IPancard): void {
    console.log(pancard);
    this.editForm.patchValue({
      // For User
      //  --------------------------------------
      // id: user.id,
      // login: user.login,
      // firstName: user.firstName,
      // lastName: user.lastName,
      // email: user.email,
      // activated: user.activated,
      // langKey: user.langKey,
      // authorities: user.authorities,

      // For Pancard
      //---------------------------------------
      id: pancard.id,
      email: pancard.email,
      mobile: pancard.mobile,
      panid: pancard.panid,
      nameasaadhaar: pancard.nameasaadhaar,
      adhaarno: pancard.aadhaarno,
      panstatus: pancard.panstatus,
      dob: pancard.dob,
      address: pancard.address,
    });
  }

  private updateUser(pancard: IPancard): void {
    // user.login = this.editForm.get(['login'])!.value;
    // user.firstName = this.editForm.get(['firstName'])!.value;
    // user.lastName = this.editForm.get(['lastName'])!.value;
    // user.email = this.editForm.get(['email'])!.value;
    // user.activated = this.editForm.get(['activated'])!.value;
    // user.langKey = this.editForm.get(['langKey'])!.value;
    // user.authorities = this.editForm.get(['authorities'])!.value;
    pancard.panid = this.editForm.get(['panid'])!.value;
    pancard.nameasaadhaar = this.editForm.get(['nameasaadhaar'])!.value;
    pancard.panstatus = this.editForm.get(['panstatus'])!.value;
    pancard.address = this.editForm.get(['address'])!.value;
    pancard.dob = this.editForm.get(['dob'])!.value;
    pancard.email = this.editForm.get(['email'])!.value;
    pancard.mobile = this.editForm.get(['mobile'])!.value;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
}
