import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { StatusCategoryService } from '../service/status-category.service';

import { StatusCategoryComponent } from './status-category.component';

describe('StatusCategory Management Component', () => {
  let comp: StatusCategoryComponent;
  let fixture: ComponentFixture<StatusCategoryComponent>;
  let service: StatusCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StatusCategoryComponent],
    })
      .overrideTemplate(StatusCategoryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StatusCategoryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StatusCategoryService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.statusCategories?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
