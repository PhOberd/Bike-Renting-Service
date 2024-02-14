import { TestBed } from '@angular/core/testing';

import { ParkingPlaceService } from './parking-place.service';

describe('ParkingPlaceService', () => {
  let service: ParkingPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
