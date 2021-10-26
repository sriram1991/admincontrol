import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanDeleteComponent } from './pan-delete.component';

describe('PanDeleteComponent', () => {
  let component: PanDeleteComponent;
  let fixture: ComponentFixture<PanDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanDeleteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
