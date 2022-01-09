import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { StatusService } from '../service/status.service';

import { StatusComponent } from './status.component';

describe('Status Management Component', () => {
  let comp: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;
  let service: StatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StatusComponent],
    })
      .overrideTemplate(StatusComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StatusComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StatusService);

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
    expect(comp.statuses?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
