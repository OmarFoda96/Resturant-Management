import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthSystemsService } from '../services/auth-systems.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  messageSent: boolean = false;
  loading: boolean = false;

  form: FormGroup = new FormGroup({
    nationalId: new FormControl(null, Validators.required),
  });

  constructor(
    private modalservice: NgbModal,
    private authService: AuthSystemsService,
    private toasterService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.authService.forgetPassword(this.form.value).subscribe(
      (data) => {
        this.toasterService.success(
          'تم ارسال ايميل به رمز دخول مؤقت',
          'عملية ناجحة'
        );
        this.router.navigate(['/Login']);
        this.messageSent = true;
        this.loading = false;
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

  formIsRight: boolean = false;
  controlIsRight: boolean = true;
  numberPattern = /^[0-9]*$/;
  ssnError: string = '';
  checkNumber(e) {
    let ssn = e.target.value.split('');
    let ssnYear = parseInt(ssn[1] + ssn[2]);
    let ssnMonth = parseInt(ssn[3] + ssn[4]);
    let ssnDay = parseInt(ssn[5] + ssn[6]);
    let ssnGovernrate = parseInt(ssn[7] + ssn[8]);

    // debugger
    if (this.numberPattern.test(e.target.value) == false) {
      this.ssnError = 'يجب ادخال البيانات على هيئة ارقام فقط';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else if (e.target.value == '') {
      this.ssnError = 'هذه الخانة مطلوبة';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else if (e.target.value.length != 14) {
      this.ssnError = 'الرقم القومى يجب ان يكون 14 رقم';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else if (
      ssn[0] == '2' &&
      (ssnYear < 40 ||
        ssnYear > 99 ||
        ssnMonth < 1 ||
        ssnMonth > 12 ||
        ssnDay < 1 ||
        ssnDay > 31 ||
        ssnGovernrate < 0 ||
        ssnGovernrate > 28)
    ) {
      this.ssnError = 'هذا الرقم القومى غير صحيح';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else if (
      ssn[0] == '3' &&
      (ssnYear < 0 ||
        ssnYear > 99 ||
        ssnMonth < 1 ||
        ssnMonth > 12 ||
        ssnDay < 1 ||
        ssnDay > 31 ||
        ssnGovernrate < 0 ||
        ssnGovernrate > 28)
    ) {
      this.ssnError = 'هذا الرقم القومى غير صحيح';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else if (ssn[0] != '3' && ssn[0] != '2') {
      this.ssnError = 'هذا الرقم القومى غير صحيح';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else {
      this.controlIsRight = true;
      this.formIsRight = true;
    }
  }
}
