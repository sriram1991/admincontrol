import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IStatusCategory, StatusCategory } from '../status-category.model';
import { StatusCategoryService } from '../service/status-category.service';

@Component({
  selector: 'sys-status-category-update',
  templateUrl: './status-category-update.component.html',
})
export class StatusCategoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(60)]],
    description: [null, [Validators.maxLength(100)]],
  });

  constructor(
    protected statusCategoryService: StatusCategoryService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ statusCategory }) => {
      this.updateForm(statusCategory);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const statusCategory = this.createFromForm();
    if (statusCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.statusCategoryService.update(statusCategory));
    } else {
      this.subscribeToSaveResponse(this.statusCategoryService.create(statusCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatusCategory>>): void {
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

  protected updateForm(statusCategory: IStatusCategory): void {
    this.editForm.patchValue({
      id: statusCategory.id,
      name: statusCategory.name,
      description: statusCategory.description,
    });
  }

  protected createFromForm(): IStatusCategory {
    return {
      ...new StatusCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
