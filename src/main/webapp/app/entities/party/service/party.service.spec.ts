import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { Gender } from 'app/entities/enumerations/gender.model';
import { IParty, Party } from '../party.model';

import { PartyService } from './party.service';

describe('Party Service', () => {
  let service: PartyService;
  let httpMock: HttpTestingController;
  let elemDefault: IParty;
  let expectedResult: IParty | IParty[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PartyService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      firstName: 'AAAAAAA',
      middleName: 'AAAAAAA',
      lastName: 'AAAAAAA',
      gender: Gender.MALE,
      birthDate: currentDate,
      mobileNumber: 'AAAAAAA',
      email: 'AAAAAAA',
      isTemporaryPassword: false,
      profileImageUrl: 'AAAAAAA',
      notes: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          birthDate: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Party', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          birthDate: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          birthDate: currentDate,
        },
        returnedFromService
      );

      service.create(new Party()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Party', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          firstName: 'BBBBBB',
          middleName: 'BBBBBB',
          lastName: 'BBBBBB',
          gender: 'BBBBBB',
          birthDate: currentDate.format(DATE_FORMAT),
          mobileNumber: 'BBBBBB',
          email: 'BBBBBB',
          isTemporaryPassword: true,
          profileImageUrl: 'BBBBBB',
          notes: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          birthDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Party', () => {
      const patchObject = Object.assign(
        {
          gender: 'BBBBBB',
          profileImageUrl: 'BBBBBB',
          notes: 'BBBBBB',
        },
        new Party()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          birthDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Party', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          firstName: 'BBBBBB',
          middleName: 'BBBBBB',
          lastName: 'BBBBBB',
          gender: 'BBBBBB',
          birthDate: currentDate.format(DATE_FORMAT),
          mobileNumber: 'BBBBBB',
          email: 'BBBBBB',
          isTemporaryPassword: true,
          profileImageUrl: 'BBBBBB',
          notes: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          birthDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Party', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPartyToCollectionIfMissing', () => {
      it('should add a Party to an empty array', () => {
        const party: IParty = { id: 123 };
        expectedResult = service.addPartyToCollectionIfMissing([], party);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(party);
      });

      it('should not add a Party to an array that contains it', () => {
        const party: IParty = { id: 123 };
        const partyCollection: IParty[] = [
          {
            ...party,
          },
          { id: 456 },
        ];
        expectedResult = service.addPartyToCollectionIfMissing(partyCollection, party);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Party to an array that doesn't contain it", () => {
        const party: IParty = { id: 123 };
        const partyCollection: IParty[] = [{ id: 456 }];
        expectedResult = service.addPartyToCollectionIfMissing(partyCollection, party);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(party);
      });

      it('should add only unique Party to an array', () => {
        const partyArray: IParty[] = [{ id: 123 }, { id: 456 }, { id: 41865 }];
        const partyCollection: IParty[] = [{ id: 123 }];
        expectedResult = service.addPartyToCollectionIfMissing(partyCollection, ...partyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const party: IParty = { id: 123 };
        const party2: IParty = { id: 456 };
        expectedResult = service.addPartyToCollectionIfMissing([], party, party2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(party);
        expect(expectedResult).toContain(party2);
      });

      it('should accept null and undefined values', () => {
        const party: IParty = { id: 123 };
        expectedResult = service.addPartyToCollectionIfMissing([], null, party, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(party);
      });

      it('should return initial array if no Party is added', () => {
        const partyCollection: IParty[] = [{ id: 123 }];
        expectedResult = service.addPartyToCollectionIfMissing(partyCollection, undefined, null);
        expect(expectedResult).toEqual(partyCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
