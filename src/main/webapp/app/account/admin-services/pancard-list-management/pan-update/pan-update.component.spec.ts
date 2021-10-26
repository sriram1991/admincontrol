import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanUpdateComponent } from './pan-update.component';

describe('PanUpdateComponent', () => {
  let component: PanUpdateComponent;
  let fixture: ComponentFixture<PanUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanUpdateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
