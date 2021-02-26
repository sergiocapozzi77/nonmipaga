import { TestBed } from '@angular/core/testing';

import { FurbettiService } from './furbetti.service';

describe('FurbettiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FurbettiService = TestBed.get(FurbettiService);
    expect(service).toBeTruthy();
  });
});
