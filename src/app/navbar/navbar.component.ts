import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: "navbar",
    styleUrls: [ './navbar.component.scss' ],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    constructor(private authService: AuthService, private router: Router) {}

    logout() {
       this.authService.logout().subscribe(() => this.router.navigate(['/']));
    }

}