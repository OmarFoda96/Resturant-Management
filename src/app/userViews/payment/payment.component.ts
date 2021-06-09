import { MealsService } from './../../services/Meals.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  dataLoaded: boolean = false;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private Mealservice: MealsService
  ) {}
  cartId = localStorage.getItem('trans');

  paymentForm: FormGroup = new FormGroup({
    masterCardNumber: new FormControl('', [Validators.required]),
    nameOnCard: new FormControl('', [Validators.required]),
    expireDate: new FormControl('', [Validators.required]),
    csv: new FormControl('', [Validators.required]),
  });
  confirmFrom: FormGroup = new FormGroup({
    otp: new FormControl('', Validators.required),
  });

  otp: number;

  ngOnInit(): void {
    setTimeout(() => {
      this.dataLoaded = true;
    }, 1000);
  }
  paymentDone = {
    status: 0,
  };
  paymentDone1 = {
    status: 0,
  };
  checkPayment() {
    if (this.confirmFrom.controls.otp.value == this.otp) {
      this.Mealservice.confirmSell(this.cartId).subscribe((data: any) => {
        this.router.navigate(['/Checkout']);
        this.modalService.dismissAll();
      });
    }
  }
  payment(content) {
    this.dataLoaded = false;
    this.Mealservice.sendMailForOtp(this.cartId).subscribe((data: any) => {
      this.otp = data.data;
      this.dataLoaded = true;
      this.modalService.open(content);
    });
  }
}
