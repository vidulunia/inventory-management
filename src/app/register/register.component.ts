import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, ReactiveFormsModule],
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void { }


  async reg(event: Event) {
    event.preventDefault();

    if (this.registerForm.invalid) {
      alert('Please fill all fields correctly.');
      return;
    }

    const newUser = this.registerForm.value;
    console.log('newUser=> ', newUser);

    try {
      const response = await fetch('https://a746ju5o66.execute-api.ap-south-1.amazonaws.com/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Result=> ', result);
        alert('User registered successfully!');
        window.location.href = '/login';
      } else {
        alert('Error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error=> ', error);
      alert('Network error. Please try again later.');
    }
  }
}
