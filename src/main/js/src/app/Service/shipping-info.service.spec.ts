import { TestBed } from '@angular/core/testing';

import { ShippingInfoService } from './shipping-info.service';

describe('ShippingInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShippingInfoService = TestBed.get(ShippingInfoService);
    expect(service).toBeTruthy();
  });
});
