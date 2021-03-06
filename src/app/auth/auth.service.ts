import { Injectable } from '@angular/core';
import { 
  AuthHttp, 
  AuthConfigConsts, 
  tokenNotExpired, 
  JwtHelper 
} from 'angular2-jwt';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CONFIG } from '../app.constant';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authHttp: AuthHttp, private http: Http) { }

  isAdmin(): Boolean {
    const token = localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
    const decodedToken = this.jwtHelper.decodeToken(token);

    if (!decodedToken.hasOwnProperty('role')) {
      return null;
    }

    return decodedToken['role'] === 'admin';
  }

  loggedIn(): Boolean {
    return tokenNotExpired();
  }

  login(credentials): Observable<void> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http
      .post(`${CONFIG.ENDPOINT}/auth/login`, JSON.stringify(credentials), options)
      .map(data => localStorage.setItem(AuthConfigConsts.DEFAULT_TOKEN_NAME, data.json().token));
  }

  logout(): Observable<void> {
    return Observable.of(localStorage.removeItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
  }

}