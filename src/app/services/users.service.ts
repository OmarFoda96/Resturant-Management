import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = environment.base_url;

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(`${this.url}/api/Users/Users`);
  }
  addNewUsers(body) {
    return this.http.post(`${this.url}/api/Users/Create`, body);
  }
  updateUsers(body, id) {
    return this.http.put(`${this.url}/api/Users/${id}/Update`, body);
  }
  deleteUsers(id) {
    return this.http.delete(`${this.url}/api/Users/${id}`);
  }
}
