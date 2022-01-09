jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PancardService } from '../service/pancard.service';
import { IPancard, Pancard } from '../pancard.model';
import { IPostalAddress } from 'app/entities/postal-address/postal-address.model';
import { PostalAddressService } from 'app/entities/postal-address/service/postal-address.service';
import { IStatus } from 'app/entities/status/status.model';
import { StatusService } from 'app/entities/status/service/status.service';
import { IParty } from 'app/entities/party/party.model';
import { PartyService } from 'app/entities/party/service/party.service';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { PancardUpdateComponent } from './pancard-update.component';

describe('Pancard Management Update Component', () => {
  let comp: PancardUpdateComponent;
  let fixture: ComponentFixture<PancardUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pancardService: PancardService;
  let postalAddressService: PostalAddressService;
  let statusService: StatusService;
  let partyService: PartyService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PancardUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(PancardUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PancardUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pancardService = TestBed.inject(PancardService);
    postalAddressService = TestBed.inject(PostalAddressService);
    statusService = TestBed.inject(StatusService);
    partyService = TestBed.inject(PartyService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PostalAddress query and add missing value', () => {
      const pancard: IPancard = { id: 456 };
      const postalAddress: IPostalAddress = { id: 39548 };
      pancard.postalAddress = postalAddress;

      const postalAddressCollection: IPostalAddress[] = [{ id: 33452 }];
      jest.spyOn(postalAddressService, 'query').mockReturnValue(of(new HttpResponse({ body: postalAddressCollection })));
      const additionalPostalAddresses = [postalAddress];
      const expectedCollection: IPostalAddress[] = [...additionalPostalAddresses, ...postalAddressCollection];
      jest.spyOn(postalAddressService, 'addPostalAddressToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pancard });
      comp.ngOnInit();

      expect(postalAddressService.query).toHaveBeenCalled();
      expect(postalAddressService.addPostalAddressToCollectionIfMissing).toHaveBeenCalledWith(
        postalAddressCollection,
        ...additionalPostalAddresses
      );
      expect(comp.postalAddressesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Status query and add missing value', () => {
      const pancard: IPancard = { id: 456 };
      const status: IStatus = { id: 1563 };
      pancard.status = status;

      const statusCollection: IStatus[] = [{ id: 18931 }];
      jest.spyOn(statusService, 'query').mockReturnValue(of(new HttpResponse({ body: statusCollection })));
      const additionalStatuses = [status];
      const expectedCollection: IStatus[] = [...additionalStatuses, ...statusCollection];
      jest.spyOn(statusService, 'addStatusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pancard });
      comp.ngOnInit();

      expect(statusService.query).toHaveBeenCalled();
      expect(statusService.addStatusToCollectionIfMissing).toHaveBeenCalledWith(statusCollection, ...additionalStatuses);
      expect(comp.statusesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Party query and add missing value', () => {
      const pancard: IPancard = { id: 456 };
      const party: IParty = { id: 24135 };
      pancard.party = party;

      const partyCollection: IParty[] = [{ id: 76963 }];
      jest.spyOn(partyService, 'query').mockReturnValue(of(new HttpResponse({ body: partyCollection })));
      const additionalParties = [party];
      const expectedCollection: IParty[] = [...additionalParties, ...partyCollection];
      jest.spyOn(partyService, 'addPartyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pancard });
      comp.ngOnInit();

      expect(partyService.query).toHaveBeenCalled();
      expect(partyService.addPartyToCollectionIfMissing).toHaveBeenCalledWith(partyCollection, ...additionalParties);
      expect(comp.partiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const pancard: IPancard = { id: 456 };
      const modified: IUser = { id: 47303 };
      pancard.modified = modified;

      const userCollection: IUser[] = [{ id: 43463 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [modified];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pancard });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pancard: IPancard = { id: 456 };
      const postalAddress: IPostalAddress = { id: 80389 };
      pancard.postalAddress = postalAddress;
      const status: IStatus = { id: 27141 };
      pancard.status = status;
      const party: IParty = { id: 99217 };
      pancard.party = party;
      const modified: IUser = { id: 92607 };
      pancard.modified = modified;

      activatedRoute.data = of({ pancard });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(pancard));
      expect(comp.postalAddressesSharedCollection).toContain(postalAddress);
      expect(comp.statusesSharedCollection).toContain(status);
      expect(comp.partiesSharedCollection).toContain(party);
      expect(comp.usersSharedCollection).toContain(modified);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Pancard>>();
      const pancard = { id: 123 };
      jest.spyOn(pancardService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pancard });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pancard }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(pancardService.update).toHaveBeenCalledWith(pancard);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Pancard>>();
      const pancard = new Pancard();
      jest.spyOn(pancardService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pancard });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pancard }));
      saveSubject.complete();

      // THEN
      expect(pancardService.create).toHaveBeenCalledWith(pancard);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Pancard>>();
      const pancard = { id: 123 };
      jest.spyOn(pancardService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pancard });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pancardService.update).toHaveBeenCalledWith(pancard);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackPostalAddressById', () => {
      it('Should return tracked PostalAddress primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPostalAddressById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackStatusById', () => {
      it('Should return tracked Status primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStatusById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPartyById', () => {
      it('Should return tracked Party primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPartyById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackUserById', () => {
      it('Should return tracked User primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
