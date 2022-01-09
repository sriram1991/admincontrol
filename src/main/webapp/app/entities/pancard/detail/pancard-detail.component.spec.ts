import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PancardDetailComponent } from './pancard-detail.component';

describe('Pancard Management Detail Component', () => {
  let comp: PancardDetailComponent;
  let fixture: ComponentFixture<PancardDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PancardDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pancard: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PancardDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PancardDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pancard on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pancard).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
