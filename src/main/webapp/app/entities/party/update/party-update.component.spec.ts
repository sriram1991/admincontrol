jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PartyService } from '../service/party.service';
import { IParty, Party } from '../party.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IPartyType } from 'app/entities/party-type/party-type.model';
import { PartyTypeService } from 'app/entities/party-type/service/party-type.service';

import { PartyUpdateComponent } from './party-update.component';

describe('Party Management Update Component', () => {
  let comp: PartyUpdateComponent;
  let fixture: ComponentFixture<PartyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let partyService: PartyService;
  let userService: UserService;
  let partyTypeService: PartyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PartyUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(PartyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PartyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    partyService = TestBed.inject(PartyService);
    userService = TestBed.inject(UserService);
    partyTypeService = TestBed.inject(PartyTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const party: IParty = { id: 456 };
      const user: IUser = { id: 96642 };
      party.user = user;

      const userCollection: IUser[] = [{ id: 15337 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ party });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PartyType query and add missing value', () => {
      const party: IParty = { id: 456 };
      const partyType: IPartyType = { id: 14076 };
      party.partyType = partyType;

      const partyTypeCollection: IPartyType[] = [{ id: 21212 }];
      jest.spyOn(partyTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: partyTypeCollection })));
      const additionalPartyTypes = [partyType];
      const expectedCollection: IPartyType[] = [...additionalPartyTypes, ...partyTypeCollection];
      jest.spyOn(partyTypeService, 'addPartyTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ party });
      comp.ngOnInit();

      expect(partyTypeService.query).toHaveBeenCalled();
      expect(partyTypeService.addPartyTypeToCollectionIfMissing).toHaveBeenCalledWith(partyTypeCollection, ...additionalPartyTypes);
      expect(comp.partyTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const party: IParty = { id: 456 };
      const user: IUser = { id: 38026 };
      party.user = user;
      const partyType: IPartyType = { id: 96427 };
      party.partyType = partyType;

      activatedRoute.data = of({ party });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(party));
      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.partyTypesSharedCollection).toContain(partyType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Party>>();
      const party = { id: 123 };
      jest.spyOn(partyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ party });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: party }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(partyService.update).toHaveBeenCalledWith(party);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Party>>();
      const party = new Party();
      jest.spyOn(partyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ party });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: party }));
      saveSubject.complete();

      // THEN
      expect(partyService.create).toHaveBeenCalledWith(party);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Party>>();
      const party = { id: 123 };
      jest.spyOn(partyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ party });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(partyService.update).toHaveBeenCalledWith(party);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUserById', () => {
      it('Should return tracked User primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPartyTypeById', () => {
      it('Should return tracked PartyType primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPartyTypeById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
