jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { StatusCategoryService } from '../service/status-category.service';
import { IStatusCategory, StatusCategory } from '../status-category.model';

import { StatusCategoryUpdateComponent } from './status-category-update.component';

describe('StatusCategory Management Update Component', () => {
  let comp: StatusCategoryUpdateComponent;
  let fixture: ComponentFixture<StatusCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let statusCategoryService: StatusCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StatusCategoryUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(StatusCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StatusCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    statusCategoryService = TestBed.inject(StatusCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const statusCategory: IStatusCategory = { id: 456 };

      activatedRoute.data = of({ statusCategory });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(statusCategory));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StatusCategory>>();
      const statusCategory = { id: 123 };
      jest.spyOn(statusCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ statusCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: statusCategory }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(statusCategoryService.update).toHaveBeenCalledWith(statusCategory);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StatusCategory>>();
      const statusCategory = new StatusCategory();
      jest.spyOn(statusCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ statusCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: statusCategory }));
      saveSubject.complete();

      // THEN
      expect(statusCategoryService.create).toHaveBeenCalledWith(statusCategory);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StatusCategory>>();
      const statusCategory = { id: 123 };
      jest.spyOn(statusCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ statusCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(statusCategoryService.update).toHaveBeenCalledWith(statusCategory);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
