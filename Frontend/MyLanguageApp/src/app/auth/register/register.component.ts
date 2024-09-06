import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nativeLanguage: ['', Validators.required],
      targetLanguage: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get nativeLanguage() {
    return this.registerForm.get('nativeLanguage');
  }

  get targetLanguage() {
    return this.registerForm.get('targetLanguage');
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;
      this.authService.register(newUser).subscribe(
        response => {
          // Handle successful registration, e.g., redirect to login page
          this.router.navigate(['/auth/login']);
        },
        error => {
          // Handle registration errors
          this.errorMessage = error.message || 'Registration failed. Please try again.';
        }
      );
    }
  }
}
