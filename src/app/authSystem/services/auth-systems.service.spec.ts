import { TestBed } from '@angular/core/testing';

import { AuthSystemsService } from './auth-systems.service';

describe('AuthSystemsService', () => {
  let service: AuthSystemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSystemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
