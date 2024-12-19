import {ChangeDetectionStrategy, Component, inject, Input, model, signal} from '@angular/core';
import {DatePipe} from "@angular/common";
import {
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {DialogCreateTaskComponent} from '../dialog-create-task/dialog-create-task.component';
import {Task} from '../../models/task.model';

@Component({
  selector: 'app-create-card',
  imports: [
    MatCard,
    MatCardContent,
    MatIcon
  ],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCardComponent {
  @Input() status!: string ;
  readonly dialog = inject(MatDialog);

  onClick(){
      this.dialog.open(DialogCreateTaskComponent, {
        data: {task: {state:this.status} },
      });


  }

}
