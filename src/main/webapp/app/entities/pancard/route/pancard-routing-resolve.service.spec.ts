jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPancard, Pancard } from '../pancard.model';
import { PancardService } from '../service/pancard.service';

import { PancardRoutingResolveService } from './pancard-routing-resolve.service';

describe('Pancard routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PancardRoutingResolveService;
  let service: PancardService;
  let resultPancard: IPancard | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(PancardRoutingResolveService);
    service = TestBed.inject(PancardService);
    resultPancard = undefined;
  });

  describe('resolve', () => {
    it('should return IPancard returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPancard = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPancard).toEqual({ id: 123 });
    });

    it('should return new IPancard if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPancard = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPancard).toEqual(new Pancard());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Pancard })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPancard = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPancard).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
