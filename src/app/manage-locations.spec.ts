import { TestBed } from '@angular/core/testing';

import { ManageLocations } from './manage-locations';

describe('ManageLocations', () => {
  let service: ManageLocations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageLocations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
