import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanDetailManagementComponent } from './pan-detail-management.component';

describe('PanDetailManagementComponent', () => {
  let component: PanDetailManagementComponent;
  let fixture: ComponentFixture<PanDetailManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanDetailManagementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanDetailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
