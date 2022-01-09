import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStatusCategory, StatusCategory } from '../status-category.model';

import { StatusCategoryService } from './status-category.service';

describe('StatusCategory Service', () => {
  let service: StatusCategoryService;
  let httpMock: HttpTestingController;
  let elemDefault: IStatusCategory;
  let expectedResult: IStatusCategory | IStatusCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StatusCategoryService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
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

    it('should create a StatusCategory', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new StatusCategory()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StatusCategory', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
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

    it('should partial update a StatusCategory', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
          description: 'BBBBBB',
        },
        new StatusCategory()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StatusCategory', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
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

    it('should delete a StatusCategory', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addStatusCategoryToCollectionIfMissing', () => {
      it('should add a StatusCategory to an empty array', () => {
        const statusCategory: IStatusCategory = { id: 123 };
        expectedResult = service.addStatusCategoryToCollectionIfMissing([], statusCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(statusCategory);
      });

      it('should not add a StatusCategory to an array that contains it', () => {
        const statusCategory: IStatusCategory = { id: 123 };
        const statusCategoryCollection: IStatusCategory[] = [
          {
            ...statusCategory,
          },
          { id: 456 },
        ];
        expectedResult = service.addStatusCategoryToCollectionIfMissing(statusCategoryCollection, statusCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StatusCategory to an array that doesn't contain it", () => {
        const statusCategory: IStatusCategory = { id: 123 };
        const statusCategoryCollection: IStatusCategory[] = [{ id: 456 }];
        expectedResult = service.addStatusCategoryToCollectionIfMissing(statusCategoryCollection, statusCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(statusCategory);
      });

      it('should add only unique StatusCategory to an array', () => {
        const statusCategoryArray: IStatusCategory[] = [{ id: 123 }, { id: 456 }, { id: 55753 }];
        const statusCategoryCollection: IStatusCategory[] = [{ id: 123 }];
        expectedResult = service.addStatusCategoryToCollectionIfMissing(statusCategoryCollection, ...statusCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const statusCategory: IStatusCategory = { id: 123 };
        const statusCategory2: IStatusCategory = { id: 456 };
        expectedResult = service.addStatusCategoryToCollectionIfMissing([], statusCategory, statusCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(statusCategory);
        expect(expectedResult).toContain(statusCategory2);
      });

      it('should accept null and undefined values', () => {
        const statusCategory: IStatusCategory = { id: 123 };
        expectedResult = service.addStatusCategoryToCollectionIfMissing([], null, statusCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(statusCategory);
      });

      it('should return initial array if no StatusCategory is added', () => {
        const statusCategoryCollection: IStatusCategory[] = [{ id: 123 }];
        expectedResult = service.addStatusCategoryToCollectionIfMissing(statusCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(statusCategoryCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
