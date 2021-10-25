import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanDetailComponent } from './pan-detail.component';

describe('PanDetailComponent', () => {
  let component: PanDetailComponent;
  let fixture: ComponentFixture<PanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
