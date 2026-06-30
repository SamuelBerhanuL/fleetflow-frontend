import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.loading = true;
    this.error = '';
    
    this.api.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', this.email);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Auth Error:', err);
        this.error = err.error?.message || err.message || 'An error occurred';
        this.loading = false;
      }
    });
  }
}