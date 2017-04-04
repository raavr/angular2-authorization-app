import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  template: `
    <div>
      <navbar></navbar>
      <div class="outlet-container">
        <alert></alert>
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {

}

