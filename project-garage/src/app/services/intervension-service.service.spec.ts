import { TestBed } from '@angular/core/testing';

import { IntervensionServiceService } from './intervension-service.service';

describe('IntervensionServiceService', () => {
  let service: IntervensionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervensionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
