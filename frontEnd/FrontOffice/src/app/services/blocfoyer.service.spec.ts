import { TestBed } from '@angular/core/testing';

import { blocfoyerService } from './blocfoyer.service';

describe('BlocfoyerService', () => {
  let service: blocfoyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(blocfoyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
