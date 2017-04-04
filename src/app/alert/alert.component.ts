import { Component } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html'
})

export class AlertComponent {
    message: string;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}