import {Component, OnInit, Inject, ElementRef} from '@angular/core';
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
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';


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
public haveInfo: boolean = false;
public response: any;
public ws = new $WebSocket("ws://localhost/order");
public webSocket: any;
//public ws = new $WebSocket("ws://localhost/shoe_status");

  constructor (public dialog: MatDialog,
               public _taskService: TaskServiceService,
               public _shippingInfoService: ShippingInfoService,
               public _shoeService: ShoeService,
               public _paymentService: PaymentInfoService,
               public elementRef: ElementRef) {
  }

  ngOnInit() {
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'darkGrey';
    this.ws.onMessage(
      (msg: MessageEvent)=> {
        console.log("onMessage ", msg.data);
        this.webSocket = msg.data;
      },
      {autoApply: false}
    );
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



  addTask() {

    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '425px',
      height: '490px'
    });
    dialogRef.afterClosed().subscribe(() => {
      if(this.shoelist[0] != null && this.ShippingInfoList[0] != null && this.paymentList[0] != null){
        this.haveInfo = true;
      }
    });



  }




  clearTasks(){
    // this._taskService.removeAllTasks();
    this.haveInfo = false;
  }

  startTask(){
    this.ShippingInfoList;
    this.shoelist;
    this.paymentList;

    var obj = {
      "shoe": this.shoelist[0],
      "shippingDetails": this.ShippingInfoList[0],
      "paymentInformation": this.paymentList[0]
    }

    axios.post("/findSneaker", obj).then(function(response){
      var shoe = {
        "shoeName": "Air Jordan 1 High Zoom Fearless",
        "shoeSize": "M 10.5 / W 12",
        "shoePicture": "https://c.static-nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/sp6zvmshpfxuawpedyqn/air-jordan-1-high-zoom-fearless-shoe-6SxLcC.jpg"
      }
      this.response = shoe;
      console.log(this.response);
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: this.response,
        width: '425px',
        height: '530px'
      });
      dialogRef.afterClosed().subscribe(() => {
        axios.post("/buySneakerConfirmation", obj).then(function(response){
          // console.log(response.data);
        });
      });
    });
    // console.log(this.response);
  }


  getInfo(){
    if(this.shoelist[0] != null && this.ShippingInfoList[0] != null && this.paymentList[0] != null){
      this.haveInfo = true;
    }
  }


}
