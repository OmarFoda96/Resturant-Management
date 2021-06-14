import { CategoriesModel } from './../../Models/Categories.interface';
import { environment } from 'src/environments/environment';
import { CartModel } from './../../Models/cart.interface';
import { SalesService } from './../../services/sales.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  dataLoaded = false;
  url = environment.base_url;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private salesService: SalesService,
    private toasterService: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngbModalOptions = { size: 'xl', scrollable: true, centered: true };
  transactions: CartModel[];

  ngOnInit(): void {
    this.refreshView();
    this.getAllCategories();
  }
  govs;
  refreshView() {
    this.dataLoaded = false;
    this.salesService.getAllTransactions().subscribe((data: any) => {
      this.dataLoaded = true;
      let hos2: any[] = data.data;
      this.govs = data.data;
      this.transactions = hos2
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      this.collectionSize = this.transactions.length;
    });
  }

  categories: CategoriesModel[];
  getAllCategories() {
    this.salesService.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  }

  open(content) {
    this.modalService.open(content, this.ngbModalOptions);
  }
  selectedGov: CartModel;
  search(key) {
    this.transactions = this.govs.filter((element: CartModel) => {
      return element.meal.nameAr.includes(key);
    });
  }
  searchByCategory(key) {
    this.transactions = this.govs;
    if (key.value != 'null') {
      this.transactions = this.govs.filter((element: CartModel) => {
        return element.meal.categoryId == key.value;
      });
    }
  }
}
