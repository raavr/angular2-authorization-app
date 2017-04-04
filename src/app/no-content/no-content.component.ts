import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  styles: [`
      .no-content {
          background-color: #eee; 
          display: flex; 
          justify-content: center; 
          align-items: center;
      }
  `],
  template: `
    <div class="no-content outlet-container">
      <h1>404: page missing</h1>
    </div>
  `
})
export class NoContentComponent {

}
