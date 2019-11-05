import { Injectable } from '@angular/core';
import {Task} from '../Model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  _taskList: Task[] = [];

  constructor() { }

  addTask(task: Task) {
    this._taskList.push(task);
  }

  removeTask(id: number){
    const task = this._taskList.findIndex(c => c.ID === id);
    this._taskList.splice(task, 1);
  }

  getAllTasks(){
    return this._taskList;
  }

  removeAllTasks(){
    this._taskList = [];
  }
}
