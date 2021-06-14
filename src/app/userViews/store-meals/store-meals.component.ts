import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { CategoriesModel } from './../../Models/Categories.interface';
import { MealsModel } from '../../Models/Meals.Interface';
import { MealsService } from './../../services/Meals.service';
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store-Meals',
  templateUrl: './store-meals.component.html',
  styleUrls: ['./store-meals.component.css'],
})
export class StoreMealsComponent implements OnInit {
  dataLoaded: boolean = true;

  Meals: MealsModel[];
  fullMeals: MealsModel[];
  categories: CategoriesModel[];
  constructor(
    private MealsService: MealsService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toasterService: ToastrService,
    public cartService: CartService,
    private router: Router
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    config.size = 'xl';
    config.scrollable = true;
    config.centered = true;
  }
  ngOnInit(): void {
    this.getAllData();
    this.getAllCategories();
  }

  getAllData() {
    this.dataLoaded = false;
    this.MealsService.getAllData().subscribe((data: any[]) => {
      this.Meals = data;
      this.fullMeals = data;
      this.dataLoaded = true;
    });
  }

  getAllCategories() {
    this.dataLoaded = false;
    this.MealsService.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
      this.dataLoaded = true;
    });
  }

  searchByPrice(e) {
    this.Meals = this.fullMeals;
    if (e.target.value != '') {
      this.Meals = this.Meals.filter((element) => {
        return element.price === +e.target.value;
      });
    } else {
      this.Meals = this.fullMeals;
    }
  }
  searchByCategory(e) {
    this.Meals = this.fullMeals;
    if (e.target.value != '') {
      this.Meals = this.Meals.filter((element) => {
        return element.categoryId === +e.target.value;
      });
    } else {
      this.Meals = this.fullMeals;
    }
  }

  searchByName(e) {
    this.Meals = this.fullMeals;
    if (e.target.value != '') {
      this.Meals = this.Meals.filter((element) => {
        return element.nameAr.includes(e.target.value);
      });
    } else {
      this.Meals = this.fullMeals;
    }
  }

  totalPrice: number = 0;
  getFinalPrice() {
    let currentMeals = this.cartService.Meals;
    currentMeals.forEach((element) => {
      this.totalPrice += element.price;
    });
  }

  newMeal = [];
  goCart(content) {
    this.getFinalPrice();
    this.modalService.open(content);
    let currentMeals = this.cartService.Meals;
    currentMeals.sort((a, b) => {
      return a.id - b.id;
    });
    for (let i = 0; i < currentMeals.length; i++) {
      if (this.newMeal.length > 0) {
        let x = this.newMeal.find((el) => {
          return el.mealId === currentMeals[i].id;
        });

        if (x) {
          x.count++;
        } else {
          this.newMeal.push({
            mealId: currentMeals[i].id,
            count: 1,
          });
        }
      } else {
        this.newMeal.push({
          mealId: currentMeals[i].id,
          count: 0,
        });
        i--;
      }
    }
  }

  balance = parseFloat(localStorage.getItem('balance'));
  sendCartItem(mealList, paymentWay) {
    let body = {
      meals: mealList,
      isDone: false,
      totalPrice: this.totalPrice,
      paymentType: paymentWay,
    };
    this.dataLoaded = false;
    this.MealsService.sendCartItem(body).subscribe((data: any) => {
      localStorage.setItem('trans', data.data);
      if (paymentWay) {
        this.MealsService.confirmSell(data.data).subscribe((data) => {
          this.modalService.dismissAll();
          this.dataLoaded = true;
          this.router.navigate(['/Checkout']);
        });
      } else {
        this.router.navigate(['/Checkout']);
      }
    });
  }

  goPayment(paymentWay) {
    this.dataLoaded = false;
    if (paymentWay) {
      if (this.balance < this.totalPrice) {
        this.dataLoaded = true;
        this.toasterService.error(
          'عملية غير ناجحة',
          'عفواً, رصيدك لا يكفي لإتمام عملية الشراء'
        );
      } else {
        this.dataLoaded = true;
        this.sendCartItem(this.newMeal, paymentWay);
        this.balance = this.balance - this.totalPrice;
        localStorage.setItem('balance', this.balance.toString());
        this.MealsService.balance = this.balance.toString();
      }
    } else {
      this.dataLoaded = true;
      this.sendCartItem(this.newMeal, paymentWay);
      this.modalService.dismissAll();
    }
  }
}
