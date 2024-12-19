import {Component, inject, model} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef,
} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {Task} from '../../models/task.model';
import {Status} from '../../enums/status.enum';
import {TaskService} from '../../services/task.service';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {GenericService} from '../../services/generic.service';

@Component({
  selector: 'app-dialog-create-task',
  imports: [
    MatFormField,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './dialog-create-task.component.html',
  styleUrl: './dialog-create-task.component.css',
  providers: [MatDatepickerModule, provideNativeDateAdapter()]
})
export class DialogCreateTaskComponent {
  readonly data = inject<any>(MAT_DIALOG_DATA);
  currentTask: Task = this.data.task;
  readonly dialogRef = inject(MatDialogRef<DialogCreateTaskComponent>);


  taskForm!: FormGroup;
  statusOptions = Object.values(Status);
  priorityOptions = [1, 2, 3];
  currentDate: Date = new Date();
  submitLabel='';

  constructor(private fb: FormBuilder, private taskService: TaskService, private genericService: GenericService) {
  }

  ngOnInit(): void {
    if(this.currentTask.id) {
      this.submitLabel='Aggiorna Task';
    }else {
      this.submitLabel='Creare Task';
    }
    this.initForm();
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: [this.currentTask.title, [Validators.required]],
      description: [this.currentTask.description, [Validators.required]],
      state: [this.currentTask.state, [Validators.required]],
      dueDate: [this.currentTask.dueDate, [Validators.required]],
      assignedTo: [this.currentTask.assignedTo, [Validators.required]],
      priority: [this.currentTask.priority, [Validators.required]],
      createdAt: [this.currentTask.createdAt ?? this.currentDate],
      updatedAt: [this.currentDate]
    });
  }

  onSubmit() {
    const taskData: Task = this.taskForm.value;
    if (this.taskForm.valid) {
      if (this.currentTask.id) {
        taskData.id = this.currentTask.id;
        this.taskService.updateTask(taskData);
      } else {
        this.taskService.addTask(taskData);
      }
      this.dialogRef.close();
    }
  }

  getPriority(priority: number) {
    return this.genericService.getPriority(priority);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
