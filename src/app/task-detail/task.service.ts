import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http:HttpClient) { }

  private handleError(error:any):Observable<never>{
    console.error('An error occurred',error);
    return throwError('Something went wrong; please try again later.')
  }
  getTasks():Observable<any>{
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    )
  }

  getTasK(id:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError))
  }
}
