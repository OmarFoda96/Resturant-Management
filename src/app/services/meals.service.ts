import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  url = environment.base_url;
  balance = localStorage.getItem('balance');

  constructor(private http: HttpClient) {}
  getAllData() {
    return this.http.get(`${this.url}/api/Meals`);
  }
  getAllHistory() {
    return this.http.get(`${this.url}/GetHistoryTransaction`);
  }
  getAllCategories() {
    return this.http.get(`${this.url}/api/Category/`);
  }
  sendCartItem(body) {
    return this.http.post(`${this.url}/api/Transaction`, body);
  }
  getCartItems(id) {
    return this.http.get(`${this.url}/api/Transaction/${id}`);
  }
  sendMailForOtp(id) {
    return this.http.get(`${this.url}/api/Transaction/SendMailOtp/${id}`);
  }
  confirmSell(id) {
    return this.http.get(`${this.url}/api/Transaction/DoneTransaction/${id}`);
  }

  refund(id) {
    return this.http.get(`${this.url}/api/Transaction/Refund/${id}`);
  }
  getAllStats() {
    return this.http.get(`${this.url}/api/Home/statics`);
  }

  getAllMeals() {
    return this.http.get(`${this.url}/api/Meals/`);
  }
  addNewMeals(body) {
    return this.http.post(`${this.url}/api/Meals`, body);
  }
  updateMeals(body, id) {
    return this.http.put(`${this.url}/api/Meals/change/${id}`, body);
  }
  deleteMeals(id) {
    return this.http.delete(`${this.url}/api/Meals/${id}`);
  }
}
