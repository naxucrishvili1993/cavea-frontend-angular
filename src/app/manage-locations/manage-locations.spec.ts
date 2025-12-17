import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLocations } from './manage-locations';

describe('ManageLocations', () => {
  let component: ManageLocations;
  let fixture: ComponentFixture<ManageLocations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLocations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLocations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
