import { TestBed } from '@angular/core/testing';

import { TostServiceService } from './tost-service.service';

describe('TostServiceService', () => {
  let service: TostServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TostServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
