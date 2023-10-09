import { TestBed } from '@angular/core/testing';

import { KepService } from './kep.service';

describe('KepService', () => {
  let service: KepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
