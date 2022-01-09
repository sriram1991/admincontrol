import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PartyTypeDetailComponent } from './party-type-detail.component';

describe('PartyType Management Detail Component', () => {
  let comp: PartyTypeDetailComponent;
  let fixture: ComponentFixture<PartyTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ partyType: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PartyTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PartyTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load partyType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.partyType).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
