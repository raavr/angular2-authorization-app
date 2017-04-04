import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Credentials } from './credentials';

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
    credentials: Credentials = new Credentials();

    constructor(private authService: AuthService, private router: Router) {}

    login() {
        this.authService.login(this.credentials).subscribe(
            () => this.router.navigate(['home']),
            data => console.log(data.json().message)
        );
    }
}