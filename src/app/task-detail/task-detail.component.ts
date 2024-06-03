import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from './task.service';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
task:any;

constructor(
  private route:ActivatedRoute,
  private taskService : TaskService
){}

ngOnInit(): void {
  const taskId = this.route.snapshot.paramMap.get('id');
  if (taskId !== null) {
    this.taskService.getTasK(taskId).subscribe(
      data => this.task = data,
      error => console.error('Error:', error)
    );
  } else {
    console.error('Task ID is null');
  }
}
}
