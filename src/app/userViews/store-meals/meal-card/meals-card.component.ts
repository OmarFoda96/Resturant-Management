import { MealsModel } from '../../../Models/Meals.Interface';
import { MealsService } from './../../../services/Meals.service';
import { CartService } from './../../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meals-card.component.html',
  styleUrls: ['./meals-card.component.css'],
})
export class MealsCardComponent implements OnInit {
  @Input('meal') meal: MealsModel;
  url = environment.base_url;

  constructor(
    private MealsService: MealsService,
    private cartService: CartService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllMeals();
    this.cartService.Meals = [];
  }
  Meals: MealsModel[] = [];

  getAllMeals() {
    this.MealsService.getAllData().subscribe((data: any[]) => {
      this.Meals = data;
    });
  }
  itemsArray: any[] = [];

  increaseCart(meal) {
    let mealCategory = this.Meals.find((element) => {
      return element.id == meal.id;
    });
    if (this.itemsArray.length < mealCategory.count) {
      this.itemsArray.push(meal);
      this.cartService.addNewData(meal);
    } else {
      this.toasterService.error(
        'عفواً, لا وجد المزيد من هذا الوجبة',
        'إضافة غير ناجحة'
      );
    }
  }

  decreaseCart(meal) {
    this.itemsArray.splice(this.itemsArray.length - 1, 1);
    this.cartService.deleteData(meal.id);
  }
}
