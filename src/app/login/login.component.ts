import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Credentials } from './credentials';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../utils/validator.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
    credentials: FormGroup;

    constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {}

    ngOnInit() {
        this.credentials = new FormGroup({
            email: new FormControl('', [Validators.required, ValidatorsService.emailValidator]),
            password: new FormControl('', Validators.required)
        });
    }

    login({ value, valid }: { value: Credentials, valid: boolean }) {
        this.authService.login(value).subscribe(
            () => this.router.navigate(['/']),
            data => this.alertService.error(data.json().message)
        );
    }
}