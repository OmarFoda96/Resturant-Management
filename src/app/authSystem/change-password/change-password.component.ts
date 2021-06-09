import { Router } from '@angular/router';
import { LogService } from './../services/log.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  messageSent: boolean = false;
  loading: boolean = false;

  form: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, Validators.required),
  });
  get newPasswordINput() {
    return this.form.controls.newPassword;
  }
  get oldPasswordInput() {
    return this.form.controls.oldPassword;
  }
  // QzjFEbTR
  constructor(
    private authService: LogService,
    private toasterService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.authService.changePassword(this.form.value).subscribe(
      (data) => {
        this.loading = false;
        this.toasterService.success(
          'تم تغيير كلمة المرور بنجاح',
          'عملية ناجحة'
        );
        localStorage.clear();
        this.router.navigate(['/Login']);
        this.messageSent = true;
      },
      (error) => {
        this.loading = false;
        if (error.status == 400) {
          let errorMsg = error.error;

          if (errorMsg.goToRegister) {
            this.router.navigate(['/Register']);
            localStorage.setItem('logState', 'false');
          } else {
            this.toasterService.error(errorMsg.nameAr, 'عملية غير ناجحة');
          }
        } else if (error.status == 500) {
          this.router.navigate(['/Error500']);
        } else {
          this.router.navigate(['/ConnectionError']);
        }
      }
    );
  }
  passwordConfirmed: boolean = false;
  checkPassword(f) {
    if (f.value == this.newPasswordINput.value) {
      this.passwordConfirmed = false;
    } else {
      this.passwordConfirmed = true;
    }
  }
}
