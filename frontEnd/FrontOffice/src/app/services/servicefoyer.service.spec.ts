import { TestBed } from '@angular/core/testing';

import { ServicefoyerService } from './servicefoyer.service';

describe('ServicefoyerService', () => {
  let service: ServicefoyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicefoyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
