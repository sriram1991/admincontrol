import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPartyType, PartyType } from '../party-type.model';

import { PartyTypeService } from './party-type.service';

describe('PartyType Service', () => {
  let service: PartyTypeService;
  let httpMock: HttpTestingController;
  let elemDefault: IPartyType;
  let expectedResult: IPartyType | IPartyType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PartyTypeService);
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

    it('should create a PartyType', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new PartyType()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PartyType', () => {
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

    it('should partial update a PartyType', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
          description: 'BBBBBB',
        },
        new PartyType()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PartyType', () => {
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

    it('should delete a PartyType', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPartyTypeToCollectionIfMissing', () => {
      it('should add a PartyType to an empty array', () => {
        const partyType: IPartyType = { id: 123 };
        expectedResult = service.addPartyTypeToCollectionIfMissing([], partyType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(partyType);
      });

      it('should not add a PartyType to an array that contains it', () => {
        const partyType: IPartyType = { id: 123 };
        const partyTypeCollection: IPartyType[] = [
          {
            ...partyType,
          },
          { id: 456 },
        ];
        expectedResult = service.addPartyTypeToCollectionIfMissing(partyTypeCollection, partyType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PartyType to an array that doesn't contain it", () => {
        const partyType: IPartyType = { id: 123 };
        const partyTypeCollection: IPartyType[] = [{ id: 456 }];
        expectedResult = service.addPartyTypeToCollectionIfMissing(partyTypeCollection, partyType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(partyType);
      });

      it('should add only unique PartyType to an array', () => {
        const partyTypeArray: IPartyType[] = [{ id: 123 }, { id: 456 }, { id: 85606 }];
        const partyTypeCollection: IPartyType[] = [{ id: 123 }];
        expectedResult = service.addPartyTypeToCollectionIfMissing(partyTypeCollection, ...partyTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const partyType: IPartyType = { id: 123 };
        const partyType2: IPartyType = { id: 456 };
        expectedResult = service.addPartyTypeToCollectionIfMissing([], partyType, partyType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(partyType);
        expect(expectedResult).toContain(partyType2);
      });

      it('should accept null and undefined values', () => {
        const partyType: IPartyType = { id: 123 };
        expectedResult = service.addPartyTypeToCollectionIfMissing([], null, partyType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(partyType);
      });

      it('should return initial array if no PartyType is added', () => {
        const partyTypeCollection: IPartyType[] = [{ id: 123 }];
        expectedResult = service.addPartyTypeToCollectionIfMissing(partyTypeCollection, undefined, null);
        expect(expectedResult).toEqual(partyTypeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
