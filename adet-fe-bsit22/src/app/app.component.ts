import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  
  // We use backticks (`) for the template to allow multiple lines
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  
}