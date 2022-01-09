import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PancardService } from '../service/pancard.service';

import { PancardComponent } from './pancard.component';

describe('Pancard Management Component', () => {
  let comp: PancardComponent;
  let fixture: ComponentFixture<PancardComponent>;
  let service: PancardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PancardComponent],
    })
      .overrideTemplate(PancardComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PancardComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PancardService);

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
    expect(comp.pancards?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
