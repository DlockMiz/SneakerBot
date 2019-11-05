import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddTaskComponent} from '../add-task/add-task.component';
import {CommonModule} from '@angular/common';
import {filter} from 'rxjs/operators';
import {Task} from '../Model/task';
import {TaskServiceService} from '../Service/task-service.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {


  constructor (public dialog: MatDialog,
               public _taskService: TaskServiceService) {
  }

  ngOnInit() {

  }

  get TaskList(){
    return this._taskService.getAllTasks();
  }



  addTask(){

    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '425px',
      height: '490px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(this.TaskList);
      console.log("hey");
    });


  }

  clearTasks(){
    this._taskService.removeAllTasks();
  }




}
