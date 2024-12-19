import {Component, inject, Input} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {Task} from '../../models/task.model';
import {DatePipe} from '@angular/common';
import {GenericService} from '../../services/generic.service';
import {MatIcon} from '@angular/material/icon';
import {TaskService} from '../../services/task.service';
import {Status} from '../../enums/status.enum';
import {DialogCreateTaskComponent} from '../dialog-create-task/dialog-create-task.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-task-card',
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardFooter,
    DatePipe,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() task!: Task ;
  readonly dialog = inject(MatDialog);
  constructor(public genericService: GenericService, public taskService: TaskService) {

  }

  getPriority(priority: number){
    return  this.genericService.getPriority(priority);
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(task.state, task.id);
  }
  edit(task: Task){

    this.dialog.open(DialogCreateTaskComponent, {
      data: {task: task },
    });
  }
}
