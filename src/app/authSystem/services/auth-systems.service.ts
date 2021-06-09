import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthSystemsService {
  TokenObject;
  userObject;
  url = environment.base_url;
  constructor(private http: HttpClient, handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  loginUser(body) {
    return this.http.post(`${this.url}/api/Users/authenticate/`, body);
  }
  registerUser(body) {
    return this.http.post(`${this.url}/api/Users/Create`, body);
  }
  forgetPassword(body) {
    return this.http.put(`${this.url}/api/Users/SendEMail`, body);
  }
}
