import { EMPTY } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Furbetto from '../models/Furbetto';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FurbettiService {

  constructor(private http: HttpClient) { }

  addFurbetto(furbetto: Furbetto): Observable<Furbetto> {
    console.log("posting to ", furbetto)
    return this.http.post<Furbetto>(environment.baseUrl + 'furbetti/add', furbetto)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return EMPTY;
  }
}
