import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StatusCategoryDetailComponent } from './status-category-detail.component';

describe('StatusCategory Management Detail Component', () => {
  let comp: StatusCategoryDetailComponent;
  let fixture: ComponentFixture<StatusCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusCategoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ statusCategory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StatusCategoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StatusCategoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load statusCategory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.statusCategory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
