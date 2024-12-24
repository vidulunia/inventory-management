// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginService {
//   private apiUrl = 'https://a746ju5o66.execute-api.ap-south-1.amazonaws.com/v1/auth/login';

//   constructor(private http: HttpClient) { }

//   login(credentials: { username: string; password: string }): Observable<any> {
//     return this.http.post(this.apiUrl, credentials).pipe(
//       catchError((error) => {
//         console.error('Login error:', error);
//         return throwError(() => new Error('Login failed. Please try again.'));
//       })
//     );
//   }

//   logout(): void {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//   }

//   saveAuthToken(token: string): void {
//     localStorage.setItem('authToken', token);
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('authToken');
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://a746ju5o66.execute-api.ap-south-1.amazonaws.com/v1/auth/login';

  constructor(private http: HttpClient) { }
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
  saveuserdata(userData: any): void {
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
  isloggedin(): boolean {
    return !!localStorage.getItem('authToken');
  }
}

