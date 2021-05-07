import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Login } from '../models/loginmodel';
import { TokenCombo } from '../models/tokencombomodel';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient,
    private router: Router) { }

  private authUrl: string = "http://localhost:5000/Authorization/";
  private jwtHelper = new JwtHelperService();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  isLoggedIn(): boolean {
    if (!localStorage["tokenInfo"] || !this.isJson(localStorage["tokenInfo"])) {
      return false;
    }

    var tokenInfo: TokenCombo = JSON.parse(localStorage["tokenInfo"]);

    if (!tokenInfo.token || !tokenInfo.refreshToken) {
      return false;
    }

    if (this.jwtHelper.isTokenExpired(tokenInfo.token)) {
      if (new Date(tokenInfo.refreshExpirationDate).getTime() < new Date().getTime()) {
        return false;
      }
      this.refreshToken(tokenInfo).subscribe(combo => {
        if (combo != null) {
          localStorage["tokenInfo"] = JSON.stringify(combo);
        }
      });
      return true;
    }
    return true;
  }

  getToken(details: Login): Observable<TokenCombo> {
    return this.http.post<TokenCombo>(`${this.authUrl}Login`, details, this.httpOptions).pipe(
      tap(_ => console.debug(`logging in as ${details.userName}`)),
      catchError(this.handleError<null>('getting token'))
    );
  }

  refreshToken(tokenInfo: TokenCombo): Observable<TokenCombo> {
    return this.http.post<TokenCombo>(`${this.authUrl}RefreshToken`, tokenInfo, this.httpOptions).pipe(
      tap(_ => console.debug(`refreshing token`)),
      catchError(this.handleError<null>("refreshing token"))
    )
  }

  private isJson(json: string): boolean {
    try {
      JSON.parse(json)
    } catch (e) {
      return false;
    }
    return true;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      this.router.navigate(['login']);
      return of(result as T);
    }
  }
}
