import { Injectable } from '@angular/core';
import {Shoe} from "../Model/shoe";
import {Task} from "../Model/task";

@Injectable({
  providedIn: 'root'
})
export class ShoeService {

  _shoeList: Shoe[] = [];

  constructor() { }

  addShoe(shoe: Shoe) {
    this._shoeList.push(shoe);
  }

  getAllShoes(){
    return this._shoeList;
  }

  removeAllShoes(){
    this._shoeList = [];
  }
}
