import { TestBed } from '@angular/core/testing';

import { RedtestService } from './redtest.service';

describe('RedtestService', () => {
  let service: RedtestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedtestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
