import { TestBed } from '@angular/core/testing';

import { CandidatureContextServiceService } from './candidature-context-service.service';

describe('CandidatureContextServiceService', () => {
  let service: CandidatureContextServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatureContextServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
