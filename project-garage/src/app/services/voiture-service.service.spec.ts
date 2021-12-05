import { TestBed } from '@angular/core/testing';

import { VoitureServiceService } from './voiture-service.service';

describe('VoitureServiceService', () => {
  let service: VoitureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoitureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
