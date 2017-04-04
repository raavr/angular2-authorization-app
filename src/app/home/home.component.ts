import { Component } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
   resp: any = {};

   constructor(private authService: AuthService, private authHttp: AuthHttp, private router: Router) {}

   sendAdminRequest() {
       this.authHttp.get("http://localhost:3001/api/admin/users").subscribe(
           data => this.resp = data.json().users,
           err => this.resp = err.json().message
        );
   }
   
   isAdmin() {
       return this.authService.isAdmin();
   }

   sendRequest() {
       this.authHttp.get("http://localhost:3001/api/admin/emails").subscribe(
           data => this.resp = data.json().emails,
           err => this.resp = err.json().message
        );
   }

   logout() {
       this.authService.logout().subscribe(() => this.router.navigate(['/']));
   }
}