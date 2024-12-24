// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard canActivate called');
    const isLoggedIn = this.authService.isLoggedIn();
    if (this.authService.isLoggedIn()) {
      console.log("user logged in")
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnurl: state.url } });
      console.log("user logged out");

      return false;
    }
  }
}