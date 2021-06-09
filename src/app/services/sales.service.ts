import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  url = environment.base_url;

  constructor(private http: HttpClient) {}

  getAllTransactions() {
    return this.http.get(`${this.url}/GetAllDoneTransactionAdmin`);
  }
  getAllCategories() {
    return this.http.get(`${this.url}/api/Category/`);
  }
}
