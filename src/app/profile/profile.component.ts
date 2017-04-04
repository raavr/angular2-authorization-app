import { Component } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import { Profile } from './profile';

@Component({
    selector: "profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent {
   profiles: Profile[] = [];

   constructor(private authService: AuthService, private profileService: ProfileService) {}

   getAllProfiles() {
       this.profileService.getAllProfiles().subscribe(
           data => this.profiles = data.json().users,
           err => console.log(err.json().message)
        );
   }

   getMyProfile() {
       this.profileService.getMyProfile().subscribe(
           data => this.profiles = data.json().emails,
           err => console.log(err.json().message)
        );
   }

}