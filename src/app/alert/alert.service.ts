import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { CONFIG } from '../app.constant';
import { MessageType, Message } from './alert';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();

  private showAndAutoHideAlert(message: Message) {
    Observable.of(null)
      .delay(CONFIG.DISPLAY_TIME)
      .startWith(message)
      .subscribe(
        (message) => this.subject.next(message)
      );
  }

  success(message: string) {
    this.showAndAutoHideAlert({ 
      type: MessageType.SUCCESS, 
      text: message 
    });
  }

  error(message: string) {
    this.showAndAutoHideAlert({ 
      type: MessageType.ERROR,
      text: message 
    });
  }

  getMessage(): Observable<Message | null> {
    return this.subject.asObservable();
  }
}