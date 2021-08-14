import { TestBed } from '@angular/core/testing';

import { EkycServiceService } from './ekyc-service.service';

describe('EkycServiceService', () => {
  let service: EkycServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EkycServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
