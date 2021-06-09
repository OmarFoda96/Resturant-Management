import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  role = localStorage.getItem('role');
  ngOnInit(): void {}
  logOut() {
    localStorage.clear();
    location.reload();
  }
}
