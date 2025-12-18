import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationItem } from './location-item';

describe('LocationItem', () => {
  let component: LocationItem;
  let fixture: ComponentFixture<LocationItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
