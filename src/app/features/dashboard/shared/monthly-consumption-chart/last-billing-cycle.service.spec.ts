import { TestBed } from '@angular/core/testing';

import { LastBillingCycleService } from './last-billing-cycle.service';

describe('LastBillingCycleService', () => {
  let service: LastBillingCycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastBillingCycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
