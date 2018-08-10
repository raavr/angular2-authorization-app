import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from './alert.service';
import { Subject } from 'rxjs';
import { Message } from './alert';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
  message: Message;
  unsub$ = new Subject<any>();

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage()
      .takeUntil(this.unsub$)
      .subscribe(message => this.message = message);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}