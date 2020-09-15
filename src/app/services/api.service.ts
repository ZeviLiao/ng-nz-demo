import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';

const localUrl = 'https://jsonplaceholder.typicode.com/posts/42';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/xml',
    Authorization: 'jwt-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // getSmartphone() {
  //   return this.http.get(localUrl);
  // }
  getSmartphone(): Observable<any> {
    return this.http.get<any>(localUrl, httpOptions).pipe(
      retry(3), catchError(this.handleError<any>('getSmartphone', null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
