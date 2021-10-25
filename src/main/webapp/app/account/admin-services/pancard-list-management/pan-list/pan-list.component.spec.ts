import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanListComponent } from './pan-list.component';

describe('PanListComponent', () => {
  let component: PanListComponent;
  let fixture: ComponentFixture<PanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
