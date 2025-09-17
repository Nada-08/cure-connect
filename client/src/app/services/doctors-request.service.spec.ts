import { TestBed } from '@angular/core/testing';

import { DoctorsRequestService } from './doctors-request.service';

describe('DoctorsRequestService', () => {
  let service: DoctorsRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorsRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
