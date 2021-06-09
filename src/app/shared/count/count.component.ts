import { MealsService } from './../../services/Meals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css'],
})
export class CountComponent implements OnInit {
  constructor(public cartService: MealsService) {}
  ngOnInit(): void {}
}
