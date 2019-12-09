import { Injectable } from '@angular/core';
import {PaymentInfo} from "../Model/payment-info";
import {ShippingInfo} from "../Model/shipping-info";

@Injectable({
  providedIn: 'root'
})
export class PaymentInfoService {

_paymentInfo: PaymentInfo[] = [];

  constructor() { }

  addThatPaymentInfo(info: PaymentInfo) {
    this._paymentInfo.push(info);
  }

  getAllPaymentInfo(){
    return this._paymentInfo;
  }

  removeAllPaymentInfo(){
    this._paymentInfo = [];
  }
}
