import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPostalAddress, PostalAddress } from '../postal-address.model';

import { PostalAddressService } from './postal-address.service';

describe('PostalAddress Service', () => {
  let service: PostalAddressService;
  let httpMock: HttpTestingController;
  let elemDefault: IPostalAddress;
  let expectedResult: IPostalAddress | IPostalAddress[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PostalAddressService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      toName: 'AAAAAAA',
      address1: 'AAAAAAA',
      address2: 'AAAAAAA',
      city: 'AAAAAAA',
      landmark: 'AAAAAAA',
      postalCode: 'AAAAAAA',
      isIndianAddress: false,
      note: 'AAAAAAA',
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

    it('should create a PostalAddress', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new PostalAddress()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PostalAddress', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          toName: 'BBBBBB',
          address1: 'BBBBBB',
          address2: 'BBBBBB',
          city: 'BBBBBB',
          landmark: 'BBBBBB',
          postalCode: 'BBBBBB',
          isIndianAddress: true,
          note: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PostalAddress', () => {
      const patchObject = Object.assign(
        {
          address1: 'BBBBBB',
          address2: 'BBBBBB',
          city: 'BBBBBB',
          landmark: 'BBBBBB',
          note: 'BBBBBB',
        },
        new PostalAddress()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PostalAddress', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          toName: 'BBBBBB',
          address1: 'BBBBBB',
          address2: 'BBBBBB',
          city: 'BBBBBB',
          landmark: 'BBBBBB',
          postalCode: 'BBBBBB',
          isIndianAddress: true,
          note: 'BBBBBB',
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

    it('should delete a PostalAddress', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPostalAddressToCollectionIfMissing', () => {
      it('should add a PostalAddress to an empty array', () => {
        const postalAddress: IPostalAddress = { id: 123 };
        expectedResult = service.addPostalAddressToCollectionIfMissing([], postalAddress);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(postalAddress);
      });

      it('should not add a PostalAddress to an array that contains it', () => {
        const postalAddress: IPostalAddress = { id: 123 };
        const postalAddressCollection: IPostalAddress[] = [
          {
            ...postalAddress,
          },
          { id: 456 },
        ];
        expectedResult = service.addPostalAddressToCollectionIfMissing(postalAddressCollection, postalAddress);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PostalAddress to an array that doesn't contain it", () => {
        const postalAddress: IPostalAddress = { id: 123 };
        const postalAddressCollection: IPostalAddress[] = [{ id: 456 }];
        expectedResult = service.addPostalAddressToCollectionIfMissing(postalAddressCollection, postalAddress);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(postalAddress);
      });

      it('should add only unique PostalAddress to an array', () => {
        const postalAddressArray: IPostalAddress[] = [{ id: 123 }, { id: 456 }, { id: 44567 }];
        const postalAddressCollection: IPostalAddress[] = [{ id: 123 }];
        expectedResult = service.addPostalAddressToCollectionIfMissing(postalAddressCollection, ...postalAddressArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const postalAddress: IPostalAddress = { id: 123 };
        const postalAddress2: IPostalAddress = { id: 456 };
        expectedResult = service.addPostalAddressToCollectionIfMissing([], postalAddress, postalAddress2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(postalAddress);
        expect(expectedResult).toContain(postalAddress2);
      });

      it('should accept null and undefined values', () => {
        const postalAddress: IPostalAddress = { id: 123 };
        expectedResult = service.addPostalAddressToCollectionIfMissing([], null, postalAddress, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(postalAddress);
      });

      it('should return initial array if no PostalAddress is added', () => {
        const postalAddressCollection: IPostalAddress[] = [{ id: 123 }];
        expectedResult = service.addPostalAddressToCollectionIfMissing(postalAddressCollection, undefined, null);
        expect(expectedResult).toEqual(postalAddressCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
