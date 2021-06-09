import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CartModel } from '../../Models/cart.interface';
import { MealsService } from '../../services/Meals.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private mealsService: MealsService,
    private toasterService: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  url = environment.base_url;

  dataLoaded: boolean = false;
  kinds: any[];
  finalPrice: number = 0;
  sellDone: boolean = true;

  ngOnInit(): void {
    this.getAllHistory();
  }
  newMealsShow = [];
  getAllHistory() {
    this.newMealsShow = [];
    this.mealsService.getAllHistory().subscribe((data: any) => {
      this.dataLoaded = true;
      this.kinds = data.data;
      this.kinds.forEach((element) => {
        if (this.newMealsShow.length > 0) {
          let x = this.newMealsShow.findIndex((element2) => {
            return element2.transactionId == element.id;
          });

          if (x == -1) {
            this.newMealsShow.push({
              transactionId: element.id,
              transactionDate: element.createdAt,
              finalPrice: 0,
              Meals: [
                {
                  productId: element.product.id,
                  productName: element.product.nameAr,
                  productPrice: element.product.price,
                  count: element.count,
                  totalPrice: +element.count * element.product.price,
                },
              ],
            });
          } else {
            this.newMealsShow[x].Meals.push({
              productId: element.product.id,
              productName: element.product.nameAr,
              productPrice: element.product.price,
              count: element.count,
              totalPrice: +element.count * element.product.price,
            });
          }
        } else {
          this.newMealsShow.push({
            transactionId: element.id,
            transactionDate: element.createdAt,
            finalPrice: 0,
            Meals: [
              {
                productId: element.product.id,
                productName: element.product.nameAr,
                productPrice: element.product.price,
                count: element.count,
                totalPrice: +element.count * element.product.price,
              },
            ],
          });
        }
      });

      this.newMealsShow.forEach((element) => {
        element.Meals.forEach((element2) => {
          element.finalPrice += element2.totalPrice;
        });
      });
      this.kinds = this.newMealsShow;
    });
  }
  goPayment() {
    this.router.navigate(['/Payment']);
  }
  selectedTransaction;
  refund(transaction, content2) {
    this.selectedTransaction = transaction;
    this.modalService.open(content2);
  }

  balance = parseFloat(localStorage.getItem('balance'));

  confirmRefund() {
    this.mealsService
      .refund(this.selectedTransaction.transactionId)
      .subscribe((data) => {
        this.getAllHistory();
        this.modalService.dismissAll();

        this.balance += this.selectedTransaction.finalPrice;
        this.toasterService.success(
          'تم ارجاع الوجبة بنجاح و تم ااضافة المبلغ في رصيدك',
          'عملية ناجحة'
        );
        localStorage.setItem('balance', this.balance.toString());
        this.mealsService.balance = this.balance.toString();
      });
  }
}
