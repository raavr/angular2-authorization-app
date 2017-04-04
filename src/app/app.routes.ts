import { Routes } from '@angular/router'
import { NoContentComponent } from './no-content';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { AuthGuardService } from './auth/auth-guard.service';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuardService ]},
  { path: '**',    component: NoContentComponent }
];
