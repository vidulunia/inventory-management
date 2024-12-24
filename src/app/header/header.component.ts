import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authservice: AuthService, private router: Router) { }
  isLoggedIn(): boolean {
    console.log("log iiiiiiiiiiin");
    return !!localStorage.getItem('authToken');
  }


  onLogout(): void {
    console.log("logout working..")
    this.authservice.logout();
    this.router.navigate(['/register']);
  }

}
