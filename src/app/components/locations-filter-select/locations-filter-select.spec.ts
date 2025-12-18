import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsFilterSelect } from './locations-filter-select';

describe('LocationsFilterSelect', () => {
  let component: LocationsFilterSelect;
  let fixture: ComponentFixture<LocationsFilterSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsFilterSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsFilterSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
