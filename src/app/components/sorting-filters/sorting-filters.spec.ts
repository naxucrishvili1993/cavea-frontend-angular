import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingFilters } from './sorting-filters';

describe('SortingFilters', () => {
  let component: SortingFilters;
  let fixture: ComponentFixture<SortingFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortingFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
