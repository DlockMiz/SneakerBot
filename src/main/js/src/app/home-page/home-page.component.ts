import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddTaskComponent} from '../add-task/add-task.component';
import {CommonModule} from '@angular/common';
import {filter} from 'rxjs/operators';
import {Task} from '../Model/task';
import {TaskServiceService} from '../Service/task-service.service';
import {ShippingInfoService} from "../Service/shipping-info.service";
import {ShoeService} from "../Service/shoe.service";
import {PaymentInfoService} from "../Service/payment-info.service";
import {ShippingInfo} from "../Model/shipping-info";
import {PaymentInfo} from "../Model/payment-info";
import {Shoe} from "../Model/shoe";
import axios from "axios";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
public shippingInfo: ShippingInfo[] = [];
public paymentInfo: PaymentInfo[] = [];
public shoeInfo: Shoe[] = [];
public shippingJson: string;
public paymentJson: string;
public shoeJson: string;
public finalPaylaod: string;


  constructor (public dialog: MatDialog,
               public _taskService: TaskServiceService,
               public _shippingInfoService: ShippingInfoService,
               public _shoeService: ShoeService,
               public _paymentService: PaymentInfoService) {
  }

  ngOnInit() {

  }

  get ShippingInfoList() {
    this.shippingInfo = this._shippingInfoService.getAllShippingInfo();
    return this.shippingInfo;
  }
  get shoelist(){
    this.shoeInfo = this._shoeService.getAllShoes();
    return this.shoeInfo;
  }

  get TaskList(){
    return this._taskService.getAllTasks();
  }
  get paymentList() {
    this.paymentInfo = this._paymentService.getAllPaymentInfo();
    return this.paymentInfo;
  }



  addTask(){

    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '425px',
      height: '490px'
    });

    dialogRef.afterClosed().subscribe((result) => {


    });


  }

  clearTasks(){
    this._taskService.removeAllTasks();
  }

  startTask(){
    this.ShippingInfoList;
    this.shoelist;
    this.paymentList;

    for(let info of this.shippingInfo){
      this.shippingJson = JSON.stringify(info);
    }
    for(let info of this.paymentInfo){
      this.paymentJson = JSON.stringify(info);
    }
    for(let info of this.shoeInfo){
      this.shoeJson = JSON.stringify(info);

    }
    let jsonPayload = '{"shoe":' + this.shoeJson + ', "shippingDetails":' + this.shippingJson + ', "paymentInformation":' + this.paymentJson + '}';
    console.log(jsonPayload);
    // axios.post("/findSneaker", jsonPayload).then(function(response){
    //   console.log(response.data)
    // })
  }



}
