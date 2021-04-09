import { TestBed } from '@angular/core/testing';

import { DefaultBanksService } from './default-banks.service';

describe('DefaultBanksService', () => {
  let service: DefaultBanksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultBanksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
