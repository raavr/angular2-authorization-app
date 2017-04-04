import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from './user';
import { CONFIG } from '../app.constant';

@Injectable()
export class SignupService {

  constructor(private http: Http) {}

  signup(user: User): Observable<Response> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(CONFIG.ENDPOINT + '/auth/signup', JSON.stringify(user), options)
  }

  
}