import { Component } from '@angular/core';
import {Status} from '../../enums/status.enum';
import {MatCard, MatCardActions, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

@Component({
  selector: 'app-skeleton',
  imports: [
    MatCardModule,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent {

  protected readonly Status = Status;
  protected readonly Array = Array;
}
