import { TestBed } from '@angular/core/testing';

import { CompareToPreviousYearService } from './compare-to-previous-year.service';

describe('CompareToPreviousYearService', () => {
  let service: CompareToPreviousYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareToPreviousYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
