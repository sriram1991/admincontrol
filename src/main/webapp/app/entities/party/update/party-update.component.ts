import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IParty, Party } from '../party.model';
import { PartyService } from '../service/party.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IPartyType } from 'app/entities/party-type/party-type.model';
import { PartyTypeService } from 'app/entities/party-type/service/party-type.service';
import { Gender } from 'app/entities/enumerations/gender.model';

@Component({
  selector: 'sys-party-update',
  templateUrl: './party-update.component.html',
})
export class PartyUpdateComponent implements OnInit {
  isSaving = false;
  genderValues = Object.keys(Gender);

  usersSharedCollection: IUser[] = [];
  partyTypesSharedCollection: IPartyType[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.maxLength(60)]],
    middleName: [null, [Validators.maxLength(60)]],
    lastName: [null, [Validators.maxLength(60)]],
    gender: [],
    birthDate: [],
    mobileNumber: [null, [Validators.maxLength(20)]],
    email: [null, [Validators.minLength(5), Validators.maxLength(75)]],
    isTemporaryPassword: [],
    profileImageUrl: [],
    notes: [],
    user: [],
    partyType: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected partyService: PartyService,
    protected userService: UserService,
    protected partyTypeService: PartyTypeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ party }) => {
      this.updateForm(party);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('psApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const party = this.createFromForm();
    if (party.id !== undefined) {
      this.subscribeToSaveResponse(this.partyService.update(party));
    } else {
      this.subscribeToSaveResponse(this.partyService.create(party));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  trackPartyTypeById(index: number, item: IPartyType): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParty>>): void {
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

  protected updateForm(party: IParty): void {
    this.editForm.patchValue({
      id: party.id,
      firstName: party.firstName,
      middleName: party.middleName,
      lastName: party.lastName,
      gender: party.gender,
      birthDate: party.birthDate,
      mobileNumber: party.mobileNumber,
      email: party.email,
      isTemporaryPassword: party.isTemporaryPassword,
      profileImageUrl: party.profileImageUrl,
      notes: party.notes,
      user: party.user,
      partyType: party.partyType,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, party.user);
    this.partyTypesSharedCollection = this.partyTypeService.addPartyTypeToCollectionIfMissing(
      this.partyTypesSharedCollection,
      party.partyType
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.partyTypeService
      .query()
      .pipe(map((res: HttpResponse<IPartyType[]>) => res.body ?? []))
      .pipe(
        map((partyTypes: IPartyType[]) =>
          this.partyTypeService.addPartyTypeToCollectionIfMissing(partyTypes, this.editForm.get('partyType')!.value)
        )
      )
      .subscribe((partyTypes: IPartyType[]) => (this.partyTypesSharedCollection = partyTypes));
  }

  protected createFromForm(): IParty {
    return {
      ...new Party(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      middleName: this.editForm.get(['middleName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      birthDate: this.editForm.get(['birthDate'])!.value,
      mobileNumber: this.editForm.get(['mobileNumber'])!.value,
      email: this.editForm.get(['email'])!.value,
      isTemporaryPassword: this.editForm.get(['isTemporaryPassword'])!.value,
      profileImageUrl: this.editForm.get(['profileImageUrl'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      user: this.editForm.get(['user'])!.value,
      partyType: this.editForm.get(['partyType'])!.value,
    };
  }
}
