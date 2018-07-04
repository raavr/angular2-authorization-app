import { Component, OnDestroy } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import { Profile } from './profile';
import { Subject } from 'rxjs';

@Component({
    selector: "profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnDestroy {
    profiles: Profile[] = [];
    unsub$ = new Subject<any>();

    constructor(private authService: AuthService, private profileService: ProfileService) { }

    getAllProfiles() {
        this.profileService.getAllProfiles()
            .takeUntil(this.unsub$)
            .subscribe(
                data => this.profiles = data.json().users,
                err => console.log(err.json().message)
            );
    }

    getMyProfile() {
        this.profileService.getMyProfile()
            .takeUntil(this.unsub$)
            .subscribe(
                data => this.profiles = data.json().users,
                err => console.log(err.json().message)
            );
    }

    ngOnDestroy() {
        this.unsub$.next();
        this.unsub$.complete();
    }

}