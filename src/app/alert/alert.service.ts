import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { CONFIG } from '../app.constant';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();

  private hide() {
    Observable.of(null).delay(CONFIG.DISPLAY_TIME).subscribe(() => this.subject.next());
  }

  success(message: string) {
    this.subject.next({ type: 'success', text: message });
    this.hide();
  }

  error(message: string) {
    this.subject.next({ type: 'error', text: message });
    this.hide();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}