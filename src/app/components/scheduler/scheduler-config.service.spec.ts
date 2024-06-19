import { TestBed } from '@angular/core/testing';

import { SchedulerConfigService } from './scheduler-config.service';

describe('SchedulerConfigService', () => {
  let service: SchedulerConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulerConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
