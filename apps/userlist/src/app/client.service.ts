import { Injectable, ɵɵresolveBody } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from 'libs/jwtapi-lib/src/models/clientmodel';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private httpClient: HttpClient) { }

  private clientUrl: string = "http://localhost:5000/Client/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.clientUrl}List`, this.httpOptions).pipe(
      tap(_ => console.debug("getting clients")),
      catchError(this.handleError<Client[]>("getting clients"))
    );
  }

  deleteClient(id: number): Observable<Client> {
    return this.httpClient.delete<Client>(`${this.clientUrl}Remove?id=${id}`, this.httpOptions).pipe(
      tap(_ => console.debug(`deleting client ${id}`)),
      catchError(this.handleError<Client>("deleting client"))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
