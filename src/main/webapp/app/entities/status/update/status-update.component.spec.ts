jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { StatusService } from '../service/status.service';
import { IStatus, Status } from '../status.model';
import { IStatusCategory } from 'app/entities/status-category/status-category.model';
import { StatusCategoryService } from 'app/entities/status-category/service/status-category.service';

import { StatusUpdateComponent } from './status-update.component';

describe('Status Management Update Component', () => {
  let comp: StatusUpdateComponent;
  let fixture: ComponentFixture<StatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let statusService: StatusService;
  let statusCategoryService: StatusCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StatusUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(StatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    statusService = TestBed.inject(StatusService);
    statusCategoryService = TestBed.inject(StatusCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call StatusCategory query and add missing value', () => {
      const status: IStatus = { id: 456 };
      const category: IStatusCategory = { id: 44414 };
      status.category = category;

      const statusCategoryCollection: IStatusCategory[] = [{ id: 38135 }];
      jest.spyOn(statusCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: statusCategoryCollection })));
      const additionalStatusCategories = [category];
      const expectedCollection: IStatusCategory[] = [...additionalStatusCategories, ...statusCategoryCollection];
      jest.spyOn(statusCategoryService, 'addStatusCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ status });
      comp.ngOnInit();

      expect(statusCategoryService.query).toHaveBeenCalled();
      expect(statusCategoryService.addStatusCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        statusCategoryCollection,
        ...additionalStatusCategories
      );
      expect(comp.statusCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const status: IStatus = { id: 456 };
      const category: IStatusCategory = { id: 61500 };
      status.category = category;

      activatedRoute.data = of({ status });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(status));
      expect(comp.statusCategoriesSharedCollection).toContain(category);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Status>>();
      const status = { id: 123 };
      jest.spyOn(statusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ status });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: status }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(statusService.update).toHaveBeenCalledWith(status);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Status>>();
      const status = new Status();
      jest.spyOn(statusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ status });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: status }));
      saveSubject.complete();

      // THEN
      expect(statusService.create).toHaveBeenCalledWith(status);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Status>>();
      const status = { id: 123 };
      jest.spyOn(statusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ status });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(statusService.update).toHaveBeenCalledWith(status);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackStatusCategoryById', () => {
      it('Should return tracked StatusCategory primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStatusCategoryById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
