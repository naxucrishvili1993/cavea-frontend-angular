import { TestBed } from '@angular/core/testing';

import { Inventories } from './inventories';

describe('Inventories', () => {
  let service: Inventories;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inventories);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
