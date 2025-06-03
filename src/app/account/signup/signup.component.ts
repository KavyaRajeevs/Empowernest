import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      // Check if passwords match
      const formValue = this.signUpForm.value;
      if (formValue.password !== formValue.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      // Remove confirmPassword before sending to backend
      const signupData = {
        email: formValue.email,
        password: formValue.password
        // Note: role will be added later in the role selection component
      };

      this.http.post<any>("http://localhost:3000/signupUsersList", signupData)
        .subscribe({
          next: (res) => {
            alert('SIGNUP SUCCESSFUL');
            
            // Store the user's email in localStorage for role assignment
            localStorage.setItem('currentUserEmail', formValue.email);
            
            this.signUpForm.reset();
            
            // Navigate to role selection instead of signin
            this.router.navigate(["/role"]);
          },
          error: (err) => {
            console.error('Signup error:', err);
            alert("Something went wrong");
          }
        });
    } else {
      alert('Please fill in all required fields correctly');
    }
  }
}