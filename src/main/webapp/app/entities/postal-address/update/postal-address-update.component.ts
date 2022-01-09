import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPostalAddress, PostalAddress } from '../postal-address.model';
import { PostalAddressService } from '../service/postal-address.service';

@Component({
  selector: 'sys-postal-address-update',
  templateUrl: './postal-address-update.component.html',
})
export class PostalAddressUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    toName: [null, [Validators.maxLength(100)]],
    address1: [null, [Validators.maxLength(200)]],
    address2: [null, [Validators.maxLength(200)]],
    city: [null, [Validators.maxLength(60)]],
    landmark: [null, [Validators.maxLength(60)]],
    postalCode: [null, [Validators.maxLength(10)]],
    isIndianAddress: [],
    note: [null, [Validators.maxLength(255)]],
  });

  constructor(protected postalAddressService: PostalAddressService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ postalAddress }) => {
      this.updateForm(postalAddress);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const postalAddress = this.createFromForm();
    if (postalAddress.id !== undefined) {
      this.subscribeToSaveResponse(this.postalAddressService.update(postalAddress));
    } else {
      this.subscribeToSaveResponse(this.postalAddressService.create(postalAddress));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPostalAddress>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(postalAddress: IPostalAddress): void {
    this.editForm.patchValue({
      id: postalAddress.id,
      toName: postalAddress.toName,
      address1: postalAddress.address1,
      address2: postalAddress.address2,
      city: postalAddress.city,
      landmark: postalAddress.landmark,
      postalCode: postalAddress.postalCode,
      isIndianAddress: postalAddress.isIndianAddress,
      note: postalAddress.note,
    });
  }

  protected createFromForm(): IPostalAddress {
    return {
      ...new PostalAddress(),
      id: this.editForm.get(['id'])!.value,
      toName: this.editForm.get(['toName'])!.value,
      address1: this.editForm.get(['address1'])!.value,
      address2: this.editForm.get(['address2'])!.value,
      city: this.editForm.get(['city'])!.value,
      landmark: this.editForm.get(['landmark'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      isIndianAddress: this.editForm.get(['isIndianAddress'])!.value,
      note: this.editForm.get(['note'])!.value,
    };
  }
}
