import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PostalAddressDetailComponent } from './postal-address-detail.component';

describe('PostalAddress Management Detail Component', () => {
  let comp: PostalAddressDetailComponent;
  let fixture: ComponentFixture<PostalAddressDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostalAddressDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ postalAddress: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PostalAddressDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PostalAddressDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load postalAddress on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.postalAddress).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
