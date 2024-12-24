import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { PaymenthistoryComponent } from './paymenthistory/paymenthistory.component';
@Component({
  selector: 'app-profile',
  imports: [RouterLink, MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, FormsModule, ReactiveFormsModule, MatCardModule, MatTabsModule, MatToolbarModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  username: string | null = null;
  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username
    }

    const userdata = JSON.parse(localStorage.getItem('user') || '{}');

    if (userdata) {
      this.profileForm.patchValue({
        username: userdata.username || '',
        password: userdata.password || ''
      })
    }
  }
  private showsnackbar(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, { duration });
  }

  get usernamee() {
    return this.profileForm.get('username');
  }

  get password() {
    return this.profileForm.get('password');
  }

  onclick() {
    if (this.profileForm.valid) {
      localStorage.setItem('user', JSON.stringify(this.profileForm.value));

      this.snackBar.open('Settings saved successfully!', '', { duration: 3000 });

    } else {
      this.showsnackbar('PLEASE FILL ALL FIELDS CORRECTLY');
    }
  }
}