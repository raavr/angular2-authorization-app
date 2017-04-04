import { Routes } from '@angular/router'
import { NoContentComponent } from './no-content';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { HomeComponent } from './home';
import { ProfileComponent } from './profile';
import { AuthGuardService } from './auth/auth-guard.service';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuardService ]},
  { path: '**', component: NoContentComponent }
];
