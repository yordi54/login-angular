import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }
  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  });
  hide = true;

  /* register() {
    console.log(this.myForm.value);
    const { username, password } = this.myForm.value;
    this.authService.registerUser(username, password).subscribe((res) => {
      console.log(res);
      if (res.statusCode == 400) {
        this.myForm.get('username')?.setErrors({ unique: true, message: res.message });
      }
      if (res.token) {
        this.router.navigate(['/home']);
      }
    });
    //add errors handling
  } */

  register() {
    const { name, lastname, email, password } = this.myForm.value;
    const user = { name, lastname, email, password };
    //susbsrcibe con error handling
    this.authService.registerUser(user).subscribe(
      (res) => {
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        if(err.error.statusCode == 400) {
          this.myForm.get('email')?.setErrors({ email_unique: true, message: err.error.message });
          this.router.navigate(['/auth/register']);
        }
      }
    );
  
  }

  invalid() {
    return this.myForm.invalid;
  }
}
