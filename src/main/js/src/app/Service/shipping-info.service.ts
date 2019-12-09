import { Injectable } from '@angular/core';
import {ShippingInfo} from "../Model/shipping-info";
import {Shoe} from "../Model/shoe";

@Injectable({
  providedIn: 'root'
})
export class ShippingInfoService {

  _shippingInfoList: ShippingInfo[] = [];

  constructor() { }

  addThatShippingInfo(info: ShippingInfo) {
    this._shippingInfoList.push(info);
  }

  getAllShippingInfo(){
    return this._shippingInfoList;
  }

  removeAllShippingInfo(){
    this._shippingInfoList = [];
  }
}
