import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ValidatorsService } from '../utils/validator.service';
import { User } from './user';
import { CONFIG } from '../app.constant';

@Component({
    selector: "signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"]
})
export class SignupComponent {
    user: FormGroup;

    constructor(private http: Http, private router: Router) {}

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
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
    
    // this.http
    //     .put(CONFIG.ENDPOINT + '/auth/signup', JSON.stringify(value), options)
    //     .subscribe(
    //         () => this.router.navigate(['home']),
    //         data => console.log(data.json().message)
    //     );
    }
}