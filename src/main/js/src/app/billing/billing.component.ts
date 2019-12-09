import { Component, OnInit } from '@angular/core';
import {AddTaskComponent} from '../add-task/add-task.component';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup} from "@angular/forms";
import {isBoolean} from "util";
import {ShippingInfoService} from "../Service/shipping-info.service";
import {PaymentInfoService} from "../Service/payment-info.service";

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  public shippingForm: FormGroup;
  public paymentInfoForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  public States: string[] = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  constructor( public formBuilder: FormBuilder,
               public _shippingInfoService: ShippingInfoService,
               public _paymentInfoService: PaymentInfoService) { }


  ngOnInit() {
    this.shippingForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      email: [''],
      phoneNumber: [''],
      billingAddress: [''],
      billingCity: [''],
      billingState: [''],
      billingPostalCode: [''],
      billingFirstName: [''],
      billingLastName: [''],
      billingMatchesShipping: true
    });

    this.paymentInfoForm = this.formBuilder.group({
      creditCardNumber: [''],
      expiryDate: [''],
      securityCode: [''],
    });
  }

  public onSubmit(){
    this._shippingInfoService.addThatShippingInfo(this.shippingForm.value);
  }

  public onPaymentSubmit(){
    this._paymentInfoService.addThatPaymentInfo(this.paymentInfoForm.value);
  }


}
