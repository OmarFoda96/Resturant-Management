import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = environment.base_url;

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(`${this.url}/api/Category/`);
  }
  addNewCategories(body) {
    return this.http.post(`${this.url}/api/Category`, body);
  }
  updateCategories(body) {
    return this.http.put(`${this.url}/api/Category`, body);
  }
  deleteCategories(id) {
    return this.http.delete(`${this.url}/api/Category/${id}`);
  }
}
