import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStatus, Status } from '../status.model';

import { StatusService } from './status.service';

describe('Status Service', () => {
  let service: StatusService;
  let httpMock: HttpTestingController;
  let elemDefault: IStatus;
  let expectedResult: IStatus | IStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StatusService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      sequenceNo: 0,
      description: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Status', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Status()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Status', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          sequenceNo: 1,
          description: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Status', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
          sequenceNo: 1,
          description: 'BBBBBB',
        },
        new Status()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Status', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          sequenceNo: 1,
          description: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Status', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addStatusToCollectionIfMissing', () => {
      it('should add a Status to an empty array', () => {
        const status: IStatus = { id: 123 };
        expectedResult = service.addStatusToCollectionIfMissing([], status);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(status);
      });

      it('should not add a Status to an array that contains it', () => {
        const status: IStatus = { id: 123 };
        const statusCollection: IStatus[] = [
          {
            ...status,
          },
          { id: 456 },
        ];
        expectedResult = service.addStatusToCollectionIfMissing(statusCollection, status);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Status to an array that doesn't contain it", () => {
        const status: IStatus = { id: 123 };
        const statusCollection: IStatus[] = [{ id: 456 }];
        expectedResult = service.addStatusToCollectionIfMissing(statusCollection, status);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(status);
      });

      it('should add only unique Status to an array', () => {
        const statusArray: IStatus[] = [{ id: 123 }, { id: 456 }, { id: 39377 }];
        const statusCollection: IStatus[] = [{ id: 123 }];
        expectedResult = service.addStatusToCollectionIfMissing(statusCollection, ...statusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const status: IStatus = { id: 123 };
        const status2: IStatus = { id: 456 };
        expectedResult = service.addStatusToCollectionIfMissing([], status, status2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(status);
        expect(expectedResult).toContain(status2);
      });

      it('should accept null and undefined values', () => {
        const status: IStatus = { id: 123 };
        expectedResult = service.addStatusToCollectionIfMissing([], null, status, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(status);
      });

      it('should return initial array if no Status is added', () => {
        const statusCollection: IStatus[] = [{ id: 123 }];
        expectedResult = service.addStatusToCollectionIfMissing(statusCollection, undefined, null);
        expect(expectedResult).toEqual(statusCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
