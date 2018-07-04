import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: "navbar",
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnDestroy {
  unsub$ = new Subject<any>();

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout()
      .takeUntil(this.unsub$)
      .subscribe(() => this.router.navigate(['/']));
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}