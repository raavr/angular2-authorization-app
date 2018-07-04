import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ValidatorsService } from '../utils/validator.service';
import { SignupService } from './signup.service';
import { User } from './user';
import { CONFIG } from '../app.constant';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: "signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit, OnDestroy {
    user: FormGroup;
    unsub$ = new Subject<any>();

    constructor(private signupService: SignupService, private router: Router, private alertService: AlertService) { }

    ngOnInit() {
        this.user = new FormGroup({
            nameGroup: new FormGroup({
                firstName: new FormControl('', Validators.required),
                lastName: new FormControl('', Validators.required)
            }),
            email: new FormControl('', [Validators.required, ValidatorsService.emailValidator]),
            passwordGroup: new FormGroup({
                password: new FormControl('', [Validators.required, ValidatorsService.passwordValidator]),
                passwordConf: new FormControl('', [Validators.required])
            }, ValidatorsService.passwordMatcher)
        })
    }

    signup({ value, valid }: { value: User, valid: boolean }) {
        this.signupService.signup(value)
            .takeUntil(this.unsub$)
            .subscribe(
                data => {
                    this.router.navigate(['./login']);
                    this.alertService.success(data.json().message);
                },
                data => this.alertService.error(data.json().message)
            );
    }

    ngOnDestroy() {
        this.unsub$.next();
        this.unsub$.complete();
    }
}