import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPancard, Pancard } from '../pancard.model';

import { PancardService } from './pancard.service';

describe('Pancard Service', () => {
  let service: PancardService;
  let httpMock: HttpTestingController;
  let elemDefault: IPancard;
  let expectedResult: IPancard | IPancard[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PancardService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      panNumber: 'AAAAAAA',
      aadhaarNumber: 'AAAAAAA',
      aadhaarName: 'AAAAAAA',
      birthDate: currentDate,
      imageUrl: 'AAAAAAA',
      createdAt: currentDate,
      updatedAt: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          birthDate: currentDate.format(DATE_FORMAT),
          createdAt: currentDate.format(DATE_TIME_FORMAT),
          updatedAt: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Pancard', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          birthDate: currentDate.format(DATE_FORMAT),
          createdAt: currentDate.format(DATE_TIME_FORMAT),
          updatedAt: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          birthDate: currentDate,
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        returnedFromService
      );

      service.create(new Pancard()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Pancard', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          panNumber: 'BBBBBB',
          aadhaarNumber: 'BBBBBB',
          aadhaarName: 'BBBBBB',
          birthDate: currentDate.format(DATE_FORMAT),
          imageUrl: 'BBBBBB',
          createdAt: currentDate.format(DATE_TIME_FORMAT),
          updatedAt: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          birthDate: currentDate,
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Pancard', () => {
      const patchObject = Object.assign(
        {
          aadhaarNumber: 'BBBBBB',
        },
        new Pancard()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          birthDate: currentDate,
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Pancard', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          panNumber: 'BBBBBB',
          aadhaarNumber: 'BBBBBB',
          aadhaarName: 'BBBBBB',
          birthDate: currentDate.format(DATE_FORMAT),
          imageUrl: 'BBBBBB',
          createdAt: currentDate.format(DATE_TIME_FORMAT),
          updatedAt: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          birthDate: currentDate,
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Pancard', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPancardToCollectionIfMissing', () => {
      it('should add a Pancard to an empty array', () => {
        const pancard: IPancard = { id: 123 };
        expectedResult = service.addPancardToCollectionIfMissing([], pancard);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pancard);
      });

      it('should not add a Pancard to an array that contains it', () => {
        const pancard: IPancard = { id: 123 };
        const pancardCollection: IPancard[] = [
          {
            ...pancard,
          },
          { id: 456 },
        ];
        expectedResult = service.addPancardToCollectionIfMissing(pancardCollection, pancard);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Pancard to an array that doesn't contain it", () => {
        const pancard: IPancard = { id: 123 };
        const pancardCollection: IPancard[] = [{ id: 456 }];
        expectedResult = service.addPancardToCollectionIfMissing(pancardCollection, pancard);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pancard);
      });

      it('should add only unique Pancard to an array', () => {
        const pancardArray: IPancard[] = [{ id: 123 }, { id: 456 }, { id: 58826 }];
        const pancardCollection: IPancard[] = [{ id: 123 }];
        expectedResult = service.addPancardToCollectionIfMissing(pancardCollection, ...pancardArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pancard: IPancard = { id: 123 };
        const pancard2: IPancard = { id: 456 };
        expectedResult = service.addPancardToCollectionIfMissing([], pancard, pancard2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pancard);
        expect(expectedResult).toContain(pancard2);
      });

      it('should accept null and undefined values', () => {
        const pancard: IPancard = { id: 123 };
        expectedResult = service.addPancardToCollectionIfMissing([], null, pancard, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pancard);
      });

      it('should return initial array if no Pancard is added', () => {
        const pancardCollection: IPancard[] = [{ id: 123 }];
        expectedResult = service.addPancardToCollectionIfMissing(pancardCollection, undefined, null);
        expect(expectedResult).toEqual(pancardCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
