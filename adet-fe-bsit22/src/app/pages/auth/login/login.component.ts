import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import these for the form to work
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // 1. Data properties to bind to your HTML inputs
  loginData = {
    email: '',
    password: ''
  };

  // 2. UI State properties
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  // 3. The Backend-Style Login Method
  onLogin(event: Event) {
    event.preventDefault();
    
    // Basic validation before hitting the backend
    if (!this.loginData.email.endsWith('@liceo.edu.ph')) {
      this.errorMessage = 'Please use your official @liceo.edu.ph email.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Call the service (which will eventually call Supabase/Firebase)
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login successful:', response);
        this.router.navigate(['/feed']); // Send them to the portal
      },
      error: (err) => {
        this.isLoading = false;
        // In a real backend, 'err' would contain the message from the server
        this.errorMessage = 'Invalid credentials. Please try again.';
        console.error('Login error:', err);
      }
    });
  }
}