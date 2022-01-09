import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StatusDetailComponent } from './status-detail.component';

describe('Status Management Detail Component', () => {
  let comp: StatusDetailComponent;
  let fixture: ComponentFixture<StatusDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ status: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StatusDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StatusDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load status on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.status).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
