import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/task.model';
import {Status} from '../enums/status.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private todoSource = new BehaviorSubject<Task[]>([]);
  private inProgressSource = new BehaviorSubject<Task[]>([]);
  private doneSource = new BehaviorSubject<Task[]>([]);

  private todoUrl = '/to-do.json';
  private inProgressUrl = '/in-progress.json';
  private doneUrl = '/done.json';

  constructor(private http: HttpClient) {}

  getTodoTasks() {
    return this.todoSource.asObservable();
  }

  getInProgressTasks() {
    return this.inProgressSource.asObservable();
  }

  getDoneTasks() {
    return this.doneSource.asObservable();
  }

  loadTasks() {
    forkJoin([
      this.http.get<Task[]>(this.todoUrl),
      this.http.get<Task[]>(this.inProgressUrl),
      this.http.get<Task[]>(this.doneUrl)
    ]).subscribe(([todoTasks, inProgressTasks, doneTasks]) => {
      this.todoSource.next(todoTasks);
      this.inProgressSource.next(inProgressTasks);
      this.doneSource.next(doneTasks);
    });
  }

  deleteTask(list: Status, taskId: number) {
    let currentList: Task[] = [];
    let updatedList:Task[] = [];

    switch (list) {
      case Status.TODO:
        currentList = this.todoSource.getValue();
        updatedList = currentList.filter(task => task.id !== taskId);
        this.todoSource.next(updatedList);
        break;
      case Status.INPROGRESS:
        currentList = this.inProgressSource.getValue();
        updatedList = currentList.filter(task => task.id !== taskId);
        this.inProgressSource.next(updatedList);
        break;
      case Status.DONE:
        currentList = this.doneSource.getValue();
        updatedList = currentList.filter(task => task.id !== taskId);
        this.doneSource.next(updatedList);
        break;
      default:
        console.error('Invalid status');
        break;
    }

  }

  addTask( task: Task) {
    let currentList: Task[] = [];

    switch (task.state) {
      case Status.TODO:
        currentList = this.todoSource.getValue();
        currentList.push(task);
        this.todoSource.next(currentList);
        break;
      case Status.INPROGRESS:
        currentList = this.inProgressSource.getValue();
        currentList.push(task);
        this.inProgressSource.next(currentList);
        break;
      case Status.DONE:
        currentList = this.doneSource.getValue();
        currentList.push(task);
        this.doneSource.next(currentList);
        break;
      default:
        console.error('Invalid Id');
        break;
    }
  }

  updateTask(updatedTask: Task) {
    let currentList: Task[] = [];
    let updatedList: Task[] = [];

    switch (updatedTask.state) {
      case Status.TODO:
        currentList = this.todoSource.getValue();
        updatedList = currentList.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
        this.todoSource.next(updatedList);
        break;
      case Status.INPROGRESS:
        currentList = this.inProgressSource.getValue();
        updatedList = currentList.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
        this.inProgressSource.next(updatedList);
        break;
      case Status.DONE:
        currentList = this.doneSource.getValue();
        updatedList = currentList.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
        this.doneSource.next(updatedList);
        break;
      default:
        console.error('Invalid state');
        break;
    }
  }
}
