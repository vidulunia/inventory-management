import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  private isAuthenticated = false;
  loginn(): void {
    this.isAuthenticated = true;
    localStorage.setItem('authToken', 'true');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.isAuthenticated = false;
    console.log("user has been logged out")
    this.snackBar.open('USER LOGGED OUT', 'Close', { duration: 3000 });

  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('authToken');
  }
}
