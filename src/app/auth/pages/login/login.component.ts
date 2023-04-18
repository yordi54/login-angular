import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserLoginI } from '../interfaces/user-login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }
  myForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  });
  hide = true;

  getErrorMessageUser() {
    if (this.myForm.get('username')?.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.myForm.get('username')?.hasError('exist')) {
      return this.myForm.get('username')?.getError('message');
    }
  }
  getErrorMessagePass() {
    if (this.myForm.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.myForm.get('password')?.hasError('pass')) {
      return this.myForm.get('password')?.getError('message');
    }
    if (this.myForm.get('password')?.hasError('minlength')) {
      return 'Password must have at least 8 characters';
    }
    if (this.myForm.get('password')?.hasError('maxlength')) {
      return 'Password must have at most 20 characters';
    }
  }

  /* login() {
    console.log(this.myForm.value);
    const { username, password } = this.myForm.value;
    this.authService.loginUser(username, password).subscribe(resp => {
      if (resp.statusCode == 400) {
        this.myForm.get('username')?.setErrors({ exist: true, message: 'Username not found' });
      }
      if (resp.statusCode == 401) {
        this.myForm.get('password')?.setErrors({ pass: true, message: 'Incorrect password' });
      }
      if (resp.token) {
        this.router.navigateByUrl('/home');
      }
    });
  } */

  login() {
    const { email, password } = this.myForm.value;
    const user: UserLoginI  = { email, password }
    this.authService.loginUser(user).subscribe(
      (res) => {
        this.router.navigate(['/home']);
      },
      (err) => {
        this.myForm.get('email')?.setErrors({ credentials: true });
        this.myForm.get('password')?.setErrors({ pass: true });
        this.router.navigate(['/auth/login']);
      }
    );
  }
}
