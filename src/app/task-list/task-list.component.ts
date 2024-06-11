import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from '../task-detail/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: any[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private taskService: TaskService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.taskService.getTasks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.tasks = data;
          this.cd.markForCheck();
        },
        error => console.error('Error:', error)
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
