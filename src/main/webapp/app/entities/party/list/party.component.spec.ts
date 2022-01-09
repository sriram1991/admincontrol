import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PartyService } from '../service/party.service';

import { PartyComponent } from './party.component';

describe('Party Management Component', () => {
  let comp: PartyComponent;
  let fixture: ComponentFixture<PartyComponent>;
  let service: PartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PartyComponent],
    })
      .overrideTemplate(PartyComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PartyComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PartyService);

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
    expect(comp.parties?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
