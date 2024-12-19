import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataSource } from '../models/data-source.model';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private dataSourceSubject = new BehaviorSubject<DataSource | null>(null);
  dataSource$ = this.dataSourceSubject.asObservable();

  private dataSourceUrl = '/data-source.json';

  constructor(private http: HttpClient) {}

  loadDataSource(): Observable<DataSource> {
    return this.http.get<DataSource>(this.dataSourceUrl).pipe(
      tap(data => this.dataSourceSubject.next(data))
    );
  }

  get currentDataSource(): DataSource | null {
    return this.dataSourceSubject.getValue();
  }

  getPriority(priority: number){
    const priorityItem = this.currentDataSource?.priority[priority];
    return priorityItem || '';
  }
}
