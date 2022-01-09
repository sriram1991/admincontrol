jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IStatusCategory, StatusCategory } from '../status-category.model';
import { StatusCategoryService } from '../service/status-category.service';

import { StatusCategoryRoutingResolveService } from './status-category-routing-resolve.service';

describe('StatusCategory routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: StatusCategoryRoutingResolveService;
  let service: StatusCategoryService;
  let resultStatusCategory: IStatusCategory | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(StatusCategoryRoutingResolveService);
    service = TestBed.inject(StatusCategoryService);
    resultStatusCategory = undefined;
  });

  describe('resolve', () => {
    it('should return IStatusCategory returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStatusCategory = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStatusCategory).toEqual({ id: 123 });
    });

    it('should return new IStatusCategory if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStatusCategory = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultStatusCategory).toEqual(new StatusCategory());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as StatusCategory })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStatusCategory = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStatusCategory).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
