import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';
import {TaskCardComponent} from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [
    TaskCardComponent
  ],
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] =new Array<Task>();

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
