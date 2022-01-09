jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PartyTypeService } from '../service/party-type.service';
import { IPartyType, PartyType } from '../party-type.model';

import { PartyTypeUpdateComponent } from './party-type-update.component';

describe('PartyType Management Update Component', () => {
  let comp: PartyTypeUpdateComponent;
  let fixture: ComponentFixture<PartyTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let partyTypeService: PartyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PartyTypeUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(PartyTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PartyTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    partyTypeService = TestBed.inject(PartyTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const partyType: IPartyType = { id: 456 };

      activatedRoute.data = of({ partyType });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(partyType));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PartyType>>();
      const partyType = { id: 123 };
      jest.spyOn(partyTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ partyType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: partyType }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(partyTypeService.update).toHaveBeenCalledWith(partyType);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PartyType>>();
      const partyType = new PartyType();
      jest.spyOn(partyTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ partyType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: partyType }));
      saveSubject.complete();

      // THEN
      expect(partyTypeService.create).toHaveBeenCalledWith(partyType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PartyType>>();
      const partyType = { id: 123 };
      jest.spyOn(partyTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ partyType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(partyTypeService.update).toHaveBeenCalledWith(partyType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
