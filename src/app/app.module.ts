import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { NoContentComponent } from './no-content';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { SignupService } from './signup/signup.service';
import { HomeComponent } from './home';
import { NavbarComponent } from './navbar';
import { CollapseNavbarDirective } from './navbar';
import { AuthModule } from './auth';
import { AlertModule } from './alert';
import { ProfileService } from './profile/profile.service';
import { ProfileComponent } from './profile';

const APP_SERVICE_PROVIDERS = [
  ProfileService,
  SignupService
];

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  ...APP_SERVICE_PROVIDERS
];

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    CollapseNavbarDirective,
    ProfileComponent
  ],
  imports: [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AuthModule,
    AlertModule,
    RouterModule.forRoot(ROUTES, 
      { 
        useHash: true, 
        preloadingStrategy: PreloadAllModules 
      }
    ),
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

}

