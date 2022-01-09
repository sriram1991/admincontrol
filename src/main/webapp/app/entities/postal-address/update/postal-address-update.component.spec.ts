jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PostalAddressService } from '../service/postal-address.service';
import { IPostalAddress, PostalAddress } from '../postal-address.model';

import { PostalAddressUpdateComponent } from './postal-address-update.component';

describe('PostalAddress Management Update Component', () => {
  let comp: PostalAddressUpdateComponent;
  let fixture: ComponentFixture<PostalAddressUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let postalAddressService: PostalAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostalAddressUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(PostalAddressUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PostalAddressUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    postalAddressService = TestBed.inject(PostalAddressService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const postalAddress: IPostalAddress = { id: 456 };

      activatedRoute.data = of({ postalAddress });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(postalAddress));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PostalAddress>>();
      const postalAddress = { id: 123 };
      jest.spyOn(postalAddressService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ postalAddress });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: postalAddress }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(postalAddressService.update).toHaveBeenCalledWith(postalAddress);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PostalAddress>>();
      const postalAddress = new PostalAddress();
      jest.spyOn(postalAddressService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ postalAddress });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: postalAddress }));
      saveSubject.complete();

      // THEN
      expect(postalAddressService.create).toHaveBeenCalledWith(postalAddress);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PostalAddress>>();
      const postalAddress = { id: 123 };
      jest.spyOn(postalAddressService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ postalAddress });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(postalAddressService.update).toHaveBeenCalledWith(postalAddress);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
