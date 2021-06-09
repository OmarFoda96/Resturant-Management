import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  url = environment.base_url;

  constructor(private http: HttpClient) {}

  changePassword(body) {
    return this.http.put(`${this.url}api/my/ChangePassword`, body);
  }

  logout(token: any) {
    return this.http.post(`${this.url}UsersProfile/api/logout/`, token);
  }
}
