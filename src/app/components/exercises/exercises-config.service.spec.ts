import { TestBed } from '@angular/core/testing';

import { ExercisesConfigService } from './exercises-config.service';

describe('ExercisesConfigService', () => {
  let service: ExercisesConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
