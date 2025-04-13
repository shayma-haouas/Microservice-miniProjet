import { TestBed } from '@angular/core/testing';

import { BlocfoyerService } from './blocfoyer.service';

describe('BlocfoyerService', () => {
  let service: BlocfoyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlocfoyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
