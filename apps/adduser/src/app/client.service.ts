import { Injectable } from '@angular/core';
import { Client } from 'libs/jwtapi-lib/src/models/clientmodel';

import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = "http://localhost:5000/Client/";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  addClient(details: Client) {
    return this.httpClient.post<Client>(`${this.url}Add`, details, this.httpOptions).pipe(
      tap(_ => console.debug(`adding client ${details.name} ${details.surname}`)),
      catchError(this.handleError("adding client"))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
