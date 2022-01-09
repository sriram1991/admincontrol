import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IStatus, Status } from '../status.model';
import { StatusService } from '../service/status.service';
import { IStatusCategory } from 'app/entities/status-category/status-category.model';
import { StatusCategoryService } from 'app/entities/status-category/service/status-category.service';

@Component({
  selector: 'sys-status-update',
  templateUrl: './status-update.component.html',
})
export class StatusUpdateComponent implements OnInit {
  isSaving = false;

  statusCategoriesSharedCollection: IStatusCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(60)]],
    sequenceNo: [],
    description: [null, [Validators.maxLength(100)]],
    category: [],
  });

  constructor(
    protected statusService: StatusService,
    protected statusCategoryService: StatusCategoryService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ status }) => {
      this.updateForm(status);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const status = this.createFromForm();
    if (status.id !== undefined) {
      this.subscribeToSaveResponse(this.statusService.update(status));
    } else {
      this.subscribeToSaveResponse(this.statusService.create(status));
    }
  }

  trackStatusCategoryById(index: number, item: IStatusCategory): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatus>>): void {
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

  protected updateForm(status: IStatus): void {
    this.editForm.patchValue({
      id: status.id,
      name: status.name,
      sequenceNo: status.sequenceNo,
      description: status.description,
      category: status.category,
    });

    this.statusCategoriesSharedCollection = this.statusCategoryService.addStatusCategoryToCollectionIfMissing(
      this.statusCategoriesSharedCollection,
      status.category
    );
  }

  protected loadRelationshipsOptions(): void {
    this.statusCategoryService
      .query()
      .pipe(map((res: HttpResponse<IStatusCategory[]>) => res.body ?? []))
      .pipe(
        map((statusCategories: IStatusCategory[]) =>
          this.statusCategoryService.addStatusCategoryToCollectionIfMissing(statusCategories, this.editForm.get('category')!.value)
        )
      )
      .subscribe((statusCategories: IStatusCategory[]) => (this.statusCategoriesSharedCollection = statusCategories));
  }

  protected createFromForm(): IStatus {
    return {
      ...new Status(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      sequenceNo: this.editForm.get(['sequenceNo'])!.value,
      description: this.editForm.get(['description'])!.value,
      category: this.editForm.get(['category'])!.value,
    };
  }
}
