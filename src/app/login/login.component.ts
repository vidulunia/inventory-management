import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../services/login.service';
import { catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-login',
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // isLoggedIn: boolean = false;

    // loginForm: FormGroup;
    // errorMessage: string | null = null;

    // loginobj: any = {
    //     username: '',
    //     password: ''
    // }

    // constructor(
    //     private authservice: AuthService,
    //     private router: Router,
    //     private route: ActivatedRoute,
    //     private fb: FormBuilder,
    //     private snackBar: MatSnackBar
    // ) {
    //     this.loginForm = new FormGroup({
    //         password: new FormControl('', Validators.required),
    //         username: new FormControl('', Validators.required),
    //     });
    // }
    // ngOnInit(): void {
    //     this.isLoggedIn = !!localStorage.getItem('authToken');

    // }
    // private showsnackbar(message: string, action: string = 'Close', duration: number = 3000) {
    //     this.snackBar.open(message, action, { duration });
    // }
    // async log(event: Event): Promise<void> {
    //     event.preventDefault();

    //     if (this.loginForm.invalid) {
    //         this.showsnackbar('PLEASE FILL ALL FIELDS CORRECTLY');
    //         return;
    //     }

    //     this.loginobj.username = this.loginForm.value.username;
    //     this.loginobj.password = this.loginForm.value.password;

    //     this.authservice.loginn();
    //     const returnurl = this.route.snapshot.queryParams['returnurl'] || '/';
    //     this.router.navigate([returnurl]);

    //     localStorage.setItem('user', JSON.stringify(this.loginobj));

    //     const data = localStorage.getItem('user');
    //     if (data) {
    //         const logindata = JSON.parse(data);
    //         console.log("User found in local storage:", logindata);
    //     } else {
    //         this.showsnackbar('USER NOT FOUND');
    //         this.authservice.logout();
    //     }

    //     try {
    //         const { username, password } = this.loginobj;

    //         const response = await fetch("https://a746ju5o66.execute-api.ap-south-1.amazonaws.com/v1/auth/login", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ username, password }),
    //         });

    //         if (!response || !response.ok) {
    //             if (response.status === 404) {
    //                 this.snackBar.open('USER NOT FOUND');
    //             } else if (response.status === 401) {
    //                 this.snackBar.open('INCORRECT PASSWORD.');
    //             } else {
    //                 this.snackBar.open('ERROR OCCURRED. TRY AGAIN LATER');
    //             }
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const result = await response.json();
    //         console.log("Logging in...", result);

    //         const body = JSON.parse(result.body);
    //         if (body.message === 'Login successfullll') {
    //             this.snackBar.open("You are logged in", '',
    //                 { duration: 3000 });
    //             this.router.navigate(['/homepage']);
    //         } else if (body.message === 'Missing username or password') {
    //             this.snackBar.open('USERNAME/PASSWORD MISSING', 'Close', { duration: 3000 });
    //             this.router.navigate(['/login']);
    //             this.authservice.logout();

    //         } else if (body.message === 'User not found') {
    //             this.snackBar.open('USER NOT REGISTERED', 'Close', { duration: 3000 });

    //             window.location.href = '/login';
    //             this.authservice.logout();

    //         } else if (body.message === 'Incorrect password') {
    //             this.snackBar.open('INCORRECT PASSWORD', 'Close', { duration: 3000 });

    //             window.location.href = '/login';
    //             this.authservice.logout();

    //         }
    //     } catch (error) {
    //         console.error('There was an error logging in:', error);
    //     }
    // }
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        if (this.loginService.isloggedin()) {
            this.router.navigate(['/homepage']);
        }
    }
    private showSnackBar(message: string, duration: number = 3000): void {
        this.snackBar.open(message, 'Close', { duration });
    }
    log(event: Event): void {
        event.preventDefault();

        if (this.loginForm.invalid) {
            this.showSnackBar('Please fill in all required fields.');
            return;
        }

        const { username, password } = this.loginForm.value;

        this.loginService.login({ username, password }).subscribe({
            next: (response) => {
                const body = JSON.parse(response.body);

                if (body.message === 'Login successfullll') {
                    this.loginService.saveuserdata(body.data); // Save user data in localStorage
                    this.showSnackBar('You are logged in successfully.');

                    const returnUrl = this.route.snapshot.queryParams['returnurl'] || '/homepage';
                    this.router.navigate([returnUrl]);
                } else {
                    this.handleLoginErrors(body.message);
                }
            },
            error: (error) => {
                console.error('Login error:', error);
                this.showSnackBar('An error occurred. Please try again later.');
            },
        });
    }
    private handleLoginErrors(message: string): void {
        switch (message) {
            case 'Missing username or password':
                this.showSnackBar('Username or password is missing.');
                break;
            case 'User not found':
                this.showSnackBar('User not registered.');
                break;
            case 'Incorrect password':
                this.showSnackBar('Incorrect password.');
                break;
            default:
                this.showSnackBar('An unknown error occurred.');
                break;
        }
    }
}
