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
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  requireAuth(action: () => void): void {
    if (this.isAuthenticated()) {
      action(); 
    } else {
      const returnUrl = this.router.url;
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
    }
  }

  signup(user: User): boolean {
    if (this.getUser(user.email)) {
      return false; 
    }
    localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.getUser(email);
    if (user && user.password === password) {
      localStorage.setItem('authToken', btoa(email)); 
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  getCurrentUserEmail(): string | null {
    const token = localStorage.getItem('authToken');
    return token ? atob(token) : null;
  }

  private getUser(email: string): User | null {
    const stored = localStorage.getItem(`user_${email}`);
    return stored ? JSON.parse(stored) : null;
  }
}