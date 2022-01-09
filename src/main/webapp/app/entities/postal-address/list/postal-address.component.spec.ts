import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PostalAddressService } from '../service/postal-address.service';

import { PostalAddressComponent } from './postal-address.component';

describe('PostalAddress Management Component', () => {
  let comp: PostalAddressComponent;
  let fixture: ComponentFixture<PostalAddressComponent>;
  let service: PostalAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostalAddressComponent],
    })
      .overrideTemplate(PostalAddressComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PostalAddressComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PostalAddressService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.postalAddresses?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
