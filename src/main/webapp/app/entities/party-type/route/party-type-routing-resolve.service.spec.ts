jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPartyType, PartyType } from '../party-type.model';
import { PartyTypeService } from '../service/party-type.service';

import { PartyTypeRoutingResolveService } from './party-type-routing-resolve.service';

describe('PartyType routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PartyTypeRoutingResolveService;
  let service: PartyTypeService;
  let resultPartyType: IPartyType | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(PartyTypeRoutingResolveService);
    service = TestBed.inject(PartyTypeService);
    resultPartyType = undefined;
  });

  describe('resolve', () => {
    it('should return IPartyType returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPartyType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPartyType).toEqual({ id: 123 });
    });

    it('should return new IPartyType if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPartyType = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPartyType).toEqual(new PartyType());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PartyType })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPartyType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPartyType).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
