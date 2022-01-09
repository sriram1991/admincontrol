jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPostalAddress, PostalAddress } from '../postal-address.model';
import { PostalAddressService } from '../service/postal-address.service';

import { PostalAddressRoutingResolveService } from './postal-address-routing-resolve.service';

describe('PostalAddress routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PostalAddressRoutingResolveService;
  let service: PostalAddressService;
  let resultPostalAddress: IPostalAddress | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(PostalAddressRoutingResolveService);
    service = TestBed.inject(PostalAddressService);
    resultPostalAddress = undefined;
  });

  describe('resolve', () => {
    it('should return IPostalAddress returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPostalAddress = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPostalAddress).toEqual({ id: 123 });
    });

    it('should return new IPostalAddress if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPostalAddress = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPostalAddress).toEqual(new PostalAddress());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PostalAddress })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPostalAddress = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPostalAddress).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
