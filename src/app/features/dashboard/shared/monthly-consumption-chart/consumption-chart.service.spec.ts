import { TestBed } from '@angular/core/testing';

import { ConsumptionChartService } from './consumption-chart.service';

describe('ConsumptionChartService', () => {
  let service: ConsumptionChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumptionChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
