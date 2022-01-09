import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PartyTypeService } from '../service/party-type.service';

import { PartyTypeComponent } from './party-type.component';

describe('PartyType Management Component', () => {
  let comp: PartyTypeComponent;
  let fixture: ComponentFixture<PartyTypeComponent>;
  let service: PartyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PartyTypeComponent],
    })
      .overrideTemplate(PartyTypeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PartyTypeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PartyTypeService);

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
    expect(comp.partyTypes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
