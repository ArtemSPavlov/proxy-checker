import { TestBed } from '@angular/core/testing';

import { UsersAdministrationService } from './users-administration.service';

describe('UsersAdministrationService', () => {
  let service: UsersAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
