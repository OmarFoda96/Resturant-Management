import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthSystemsService } from './../services/auth-systems.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  constructor(private authSystem: AuthSystemsService, private router: Router) {}
  response = {
    status: 0,
    message: '',
  };
  loginForm: FormGroup = new FormGroup({
    Username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}
  get Username() {
    return this.loginForm.controls.Username;
  }
  get password() {
    return this.loginForm.controls.password;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  onSubmit() {
    // debugger
    this.loading = true;
    let body = {
      Username: this.Username.value,
      password: this.password.value,
    };
    this.authSystem.loginUser(body).subscribe(
      (data: any) => {
        let tokenInfo = this.getDecodedAccessToken(data.token);
        localStorage.setItem('balance', tokenInfo.balance);
        if (tokenInfo.role == 1) {
          localStorage.setItem('role', 'user');
          this.router.navigate(['/']);
        } else {
          localStorage.setItem('role', 'admin');
          this.router.navigate(['/Admin']);
        }
        this.loading = false;
        localStorage.setItem('logState', 'true');
        localStorage.setItem('userToken', data.token);
        this.response.status = 0;
        // location.replace('/');
      },
      (error) => {
        this.loading = false;
        if (error.status == 400) {
          let errorMsg = error.error;

          if (errorMsg.goToRegister) {
            this.router.navigate(['/Register']);
            localStorage.setItem('logState', 'false');
          } else {
            this.response.status = 1;
            this.response.message = errorMsg.nameAr;
          }
        } else if (error.status == 500) {
          this.router.navigate(['/Error500']);
        } else {
          this.router.navigate(['/ConnectionError']);
        }
        // debugger;
        // this.response.message = 'اسم المستخدم او كلمة المرور غير صحيحة';
      }
    );
  }
}
