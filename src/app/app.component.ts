import {Component} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskCardComponent} from './components/task-card/task-card.component';
import {Task} from './models/task.model';
import {TaskService} from './services/task.service';
import {GenericService} from './services/generic.service';
import {Status} from './enums/status.enum';
import {CreateCardComponent} from './components/create-card/create-card.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {SkeletonComponent} from './components/skeleton/skeleton.component';


@Component({
  selector: 'app-root',
  imports: [CdkDropList, CdkDrag, TaskCardComponent, CreateCardComponent, NgxSkeletonLoaderModule, SkeletonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tms-demo';

  todoTasks: Task[] = [];
  inProgressTask: Task[] = [];
  doneTasks: Task[] = [];
  loading = true;

  constructor(private taskService: TaskService, private genericService: GenericService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.genericService.loadDataSource().subscribe(() => {
        this.loadAllTasks();
       this.loading = false;
      });
    }, 3000);

  }

  loadAllTasks() {
    this.taskService.loadTasks();
    this.taskService.getTodoTasks().subscribe(tasks => {
      this.todoTasks = tasks;
    });
    this.taskService.getInProgressTasks().subscribe(tasks => {
      this.inProgressTask = tasks;
    });
    this.taskService.getDoneTasks().subscribe(tasks => {
      this.doneTasks = tasks;
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const transferredItem = event.previousContainer.data[event.previousIndex];
      if (event.container.data === this.todoTasks) {
        transferredItem.state = Status.TODO;
      } else if (event.container.data === this.inProgressTask) {
        transferredItem.state = Status.INPROGRESS;
      } else if (event.container.data === this.doneTasks) {
        transferredItem.state = Status.DONE;
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  protected readonly Status = Status;
}
