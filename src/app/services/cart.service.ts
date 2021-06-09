import { MealsModel } from '../Models/Meals.Interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  choosedElement: number;
  Meals: MealsModel[] = [];
  itemsOnCart: number;

  findSpecificElement(code) {
    this.choosedElement = this.Meals.findIndex((element) => {
      return element.id == code;
    });
  }
  getAllData() {
    return this.Meals;
  }
  addNewData(body) {
    this.Meals.push(body);
    this.itemsOnCart = this.Meals.length;
    return this.Meals;
  }
  editData(code, body) {
    this.findSpecificElement(code);
    this.Meals.splice(this.choosedElement, 1, body);
    return this.Meals;
  }
  deleteData(code) {
    this.findSpecificElement(code);
    this.Meals.splice(this.choosedElement, 1);
    this.itemsOnCart = this.Meals.length;
    return this.Meals;
  }
}
