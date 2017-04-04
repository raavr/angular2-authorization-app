import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { CONFIG } from '../app.constant';

@Injectable()
export class ProfileService {

  constructor(private authHttp: AuthHttp) {}

  getAllProfiles() {
       return this.authHttp.get(CONFIG.ENDPOINT + "/api/admin/users");
  }

  getMyProfile() {
      return this.authHttp.get(CONFIG.ENDPOINT + "/api/admin/emails");
  }

}