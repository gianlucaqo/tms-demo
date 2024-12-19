import {Status} from '../enums/status.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  state: Status;
  dueDate: Date;
  assignedTo: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}
