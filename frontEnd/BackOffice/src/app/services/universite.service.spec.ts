import { TestBed } from '@angular/core/testing';

import { UniversiteService } from './universite.service';

describe('StageUniversite', () => {
  let universite: UniversiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    universite = TestBed.inject(UniversiteService);
  });

  it('should be created', () => {
    expect(universite).toBeTruthy();
  });
});
