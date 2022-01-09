import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StatusCategoryComponent } from './list/status-category.component';
import { StatusCategoryDetailComponent } from './detail/status-category-detail.component';
import { StatusCategoryUpdateComponent } from './update/status-category-update.component';
import { StatusCategoryDeleteDialogComponent } from './delete/status-category-delete-dialog.component';
import { StatusCategoryRoutingModule } from './route/status-category-routing.module';

@NgModule({
  imports: [SharedModule, StatusCategoryRoutingModule],
  declarations: [
    StatusCategoryComponent,
    StatusCategoryDetailComponent,
    StatusCategoryUpdateComponent,
    StatusCategoryDeleteDialogComponent,
  ],
  entryComponents: [StatusCategoryDeleteDialogComponent],
})
export class StatusCategoryModule {}
