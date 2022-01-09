import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IPancard, Pancard } from '../pancard.model';
import { PancardService } from '../service/pancard.service';
import { IPostalAddress } from 'app/entities/postal-address/postal-address.model';
import { PostalAddressService } from 'app/entities/postal-address/service/postal-address.service';
import { IStatus } from 'app/entities/status/status.model';
import { StatusService } from 'app/entities/status/service/status.service';
import { IParty } from 'app/entities/party/party.model';
import { PartyService } from 'app/entities/party/service/party.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'sys-pancard-update',
  templateUrl: './pancard-update.component.html',
})
export class PancardUpdateComponent implements OnInit {
  isSaving = false;

  postalAddressesSharedCollection: IPostalAddress[] = [];
  statusesSharedCollection: IStatus[] = [];
  partiesSharedCollection: IParty[] = [];
  usersSharedCollection: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    panNumber: [null, [Validators.maxLength(15)]],
    aadhaarNumber: [null, [Validators.maxLength(12)]],
    aadhaarName: [null, [Validators.maxLength(200)]],
    birthDate: [],
    imageUrl: [],
    createdAt: [],
    updatedAt: [],
    postalAddress: [],
    status: [],
    party: [],
    modified: [],
  });

  constructor(
    protected pancardService: PancardService,
    protected postalAddressService: PostalAddressService,
    protected statusService: StatusService,
    protected partyService: PartyService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pancard }) => {
      if (pancard.id === undefined) {
        const today = dayjs().startOf('day');
        pancard.createdAt = today;
        pancard.updatedAt = today;
      }

      this.updateForm(pancard);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pancard = this.createFromForm();
    if (pancard.id !== undefined) {
      this.subscribeToSaveResponse(this.pancardService.update(pancard));
    } else {
      this.subscribeToSaveResponse(this.pancardService.create(pancard));
    }
  }

  trackPostalAddressById(index: number, item: IPostalAddress): number {
    return item.id!;
  }

  trackStatusById(index: number, item: IStatus): number {
    return item.id!;
  }

  trackPartyById(index: number, item: IParty): number {
    return item.id!;
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPancard>>): void {
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

  protected updateForm(pancard: IPancard): void {
    this.editForm.patchValue({
      id: pancard.id,
      panNumber: pancard.panNumber,
      aadhaarNumber: pancard.aadhaarNumber,
      aadhaarName: pancard.aadhaarName,
      birthDate: pancard.birthDate,
      imageUrl: pancard.imageUrl,
      createdAt: pancard.createdAt ? pancard.createdAt.format(DATE_TIME_FORMAT) : null,
      updatedAt: pancard.updatedAt ? pancard.updatedAt.format(DATE_TIME_FORMAT) : null,
      postalAddress: pancard.postalAddress,
      status: pancard.status,
      party: pancard.party,
      modified: pancard.modified,
    });

    this.postalAddressesSharedCollection = this.postalAddressService.addPostalAddressToCollectionIfMissing(
      this.postalAddressesSharedCollection,
      pancard.postalAddress
    );
    this.statusesSharedCollection = this.statusService.addStatusToCollectionIfMissing(this.statusesSharedCollection, pancard.status);
    this.partiesSharedCollection = this.partyService.addPartyToCollectionIfMissing(this.partiesSharedCollection, pancard.party);
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, pancard.modified);
  }

  protected loadRelationshipsOptions(): void {
    this.postalAddressService
      .query()
      .pipe(map((res: HttpResponse<IPostalAddress[]>) => res.body ?? []))
      .pipe(
        map((postalAddresses: IPostalAddress[]) =>
          this.postalAddressService.addPostalAddressToCollectionIfMissing(postalAddresses, this.editForm.get('postalAddress')!.value)
        )
      )
      .subscribe((postalAddresses: IPostalAddress[]) => (this.postalAddressesSharedCollection = postalAddresses));

    this.statusService
      .query()
      .pipe(map((res: HttpResponse<IStatus[]>) => res.body ?? []))
      .pipe(map((statuses: IStatus[]) => this.statusService.addStatusToCollectionIfMissing(statuses, this.editForm.get('status')!.value)))
      .subscribe((statuses: IStatus[]) => (this.statusesSharedCollection = statuses));

    this.partyService
      .query()
      .pipe(map((res: HttpResponse<IParty[]>) => res.body ?? []))
      .pipe(map((parties: IParty[]) => this.partyService.addPartyToCollectionIfMissing(parties, this.editForm.get('party')!.value)))
      .subscribe((parties: IParty[]) => (this.partiesSharedCollection = parties));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('modified')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected createFromForm(): IPancard {
    return {
      ...new Pancard(),
      id: this.editForm.get(['id'])!.value,
      panNumber: this.editForm.get(['panNumber'])!.value,
      aadhaarNumber: this.editForm.get(['aadhaarNumber'])!.value,
      aadhaarName: this.editForm.get(['aadhaarName'])!.value,
      birthDate: this.editForm.get(['birthDate'])!.value,
      imageUrl: this.editForm.get(['imageUrl'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? dayjs(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      updatedAt: this.editForm.get(['updatedAt'])!.value ? dayjs(this.editForm.get(['updatedAt'])!.value, DATE_TIME_FORMAT) : undefined,
      postalAddress: this.editForm.get(['postalAddress'])!.value,
      status: this.editForm.get(['status'])!.value,
      party: this.editForm.get(['party'])!.value,
      modified: this.editForm.get(['modified'])!.value,
    };
  }
}
