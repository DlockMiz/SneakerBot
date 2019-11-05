import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

export interface Task {
  id: number;
  site: string;
  size: number;
  product: string;
  billing: string;
  proxy: string;
  status: string;
}

import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TaskServiceService} from '../Service/task-service.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  public form: FormGroup;
  public sizes: number[] = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16];
  public sites: string[] = ["Supreme"];
  public billing: string[] = ['Spencer', 'Mom'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddTaskComponent>,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              public _taskService: TaskServiceService,
              ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ID: [],
      site: [''],
      size: [],
      product: [''],
      billing: [''],
      proxy: [''],
    });
  }


  onNoClick(): void{
    this.dialogRef.close();
  }

  onSubmit(){
    console.log(this.form.value);
    this._taskService.addTask(this.form.value);
    this.dialogRef.close();
  }
}
