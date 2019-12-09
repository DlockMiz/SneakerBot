import { TestBed } from '@angular/core/testing';

import { PaymentInfoService } from './payment-info.service';

describe('PaymentInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentInfoService = TestBed.get(PaymentInfoService);
    expect(service).toBeTruthy();
  });
});
