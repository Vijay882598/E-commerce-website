// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Check if user is logged in
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Protect actions (Add to Cart, Buy Now, etc.)
  requireAuth(action: () => void): void {
    if (this.isAuthenticated()) {
      action(); // Logged in → run the action
    } else {
      // Not logged in → redirect to login with return URL
      const returnUrl = this.router.url;
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
    }
  }

  // Signup
  signup(user: User): boolean {
    if (this.getUser(user.email)) {
      return false; // User already exists
    }
    localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
    return true;
  }

  // Login
  login(email: string, password: string): boolean {
    const user = this.getUser(email);
    if (user && user.password === password) {
      localStorage.setItem('authToken', btoa(email)); // Simple token (base64 email)
      return true;
    }
    return false;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  // Get current logged-in user email
  getCurrentUserEmail(): string | null {
    const token = localStorage.getItem('authToken');
    return token ? atob(token) : null;
  }

  // PRIVATE: Fetch user from localStorage by email
  private getUser(email: string): User | null {
    const stored = localStorage.getItem(`user_${email}`);
    return stored ? JSON.parse(stored) : null;
  }
}