import { element } from 'protractor';
import { CartModel } from './../../Models/cart.interface';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { CategoriesService } from './../../services/categories.service';
import { MealsModel } from '../../Models/Meals.Interface';
import { MealsService } from './../../services/Meals.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriesModel } from '../../Models/Categories.interface';

@Component({
  selector: 'app-Meals',
  templateUrl: './Meals.component.html',
  styleUrls: ['./Meals.component.css'],
})
export class MealsComponent implements OnInit {
  dataLoaded = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  baseUrl = environment.base_url;
  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private MealsService: MealsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private toasterService: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngbModalOptions = { size: 'xl', scrollable: true, centered: true };
  Meals: MealsModel[];

  form: FormGroup = new FormGroup({
    nameAr: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[\u0621-\u064A0-9 ]+$'),
    ]),
    nameEn: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z .\\w!@_-]*'),
    ]),
    count: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    recipesAr: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[\u0621-\u064A0-9 ]+$'),
    ]),
    recipesEn: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z .\\w!@_-]*'),
    ]),
    categoryId: new FormControl(null, [Validators.required]),
  });
  editForm: FormGroup = new FormGroup({
    nameAr: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[\u0621-\u064A0-9 ]+$'),
    ]),
    nameEn: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z .\\w!@_-]*'),
    ]),
    count: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    recipesAr: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[\u0621-\u064A0-9 ]+$'),
    ]),
    recipesEn: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z .\\w!@_-]*'),
    ]),
    categoryId: new FormControl(null, [Validators.required]),
  });
  Attachment: FormData = new FormData();
  get inputNameAr() {
    return this.form.controls.nameAr;
  }
  get inputNameEn() {
    return this.form.controls.nameEn;
  }
  get inputcount() {
    return this.form.controls.count;
  }
  get inputprice() {
    return this.form.controls.price;
  }
  get inputrecipesAr() {
    return this.form.controls.recipesAr;
  }
  get inputrecipesEn() {
    return this.form.controls.recipesEn;
  }
  get inputcategoryId() {
    return this.form.controls.categoryId;
  }
  get editNameAr() {
    return this.editForm.controls.nameAr;
  }
  get editNameEn() {
    return this.editForm.controls.nameEn;
  }
  get editcount() {
    return this.editForm.controls.count;
  }
  get editprice() {
    return this.editForm.controls.price;
  }
  get editrecipesAr() {
    return this.editForm.controls.recipesAr;
  }
  get editrecipesEn() {
    return this.editForm.controls.recipesEn;
  }
  get editcategoryId() {
    return this.editForm.controls.categoryId;
  }

  ngOnInit(): void {
    this.refreshView();
    this.getAllCategories();
  }

  categories: CategoriesModel[];
  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  refreshView() {
    this.dataLoaded = false;
    this.MealsService.getAllMeals().subscribe((data: any[]) => {
      this.dataLoaded = true;
      let hos2: any[] = data;

      this.govs = data;
      this.Meals = hos2
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      this.collectionSize = this.Meals.length;
    });
  }

  selectedFile;
  preview(e) {
    this.selectedFile = e.target.files[0];
    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      if (this.Attachment.get('Attachment'))
        this.Attachment.set(
          'Attachment',
          this.selectedFile,
          this.selectedFile.name
        );
      else
        this.Attachment.append(
          'Attachment',
          this.selectedFile,
          this.selectedFile.name
        );
    }
  }

  open(content) {
    this.modalService.open(content, this.ngbModalOptions);
  }
  onSubmit() {
    this.dataLoaded = false;
    for (const key in this.form.value) {
      if (key !== 'photo') {
        this.Attachment.append(key, this.form.value[key]);
      }
    }

    // debugger
    this.MealsService.addNewMeals(this.Attachment).subscribe(
      (data) => {
        this.refreshView();
        this.toasterService.success('تم اضافة صنف بنجاح', 'عملية ناجحة');
        this.modalService.dismissAll();
        this.form.reset();
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['/Admin/Admin-Meals']);
        });
      },
      (error) => {
        this.toasterService.error('لم يتم اضافة صنف بنجاح', 'عملية غير ناجحة');
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['/Admin/Admin-Meals']);
        });
      }
    );
  }
  onSubmitEdit() {
    this.dataLoaded = false;
    for (const key in this.editForm.value) {
      if (key !== 'photo') {
        this.Attachment.append(key, this.editForm.value[key]);
      }
    }
    // debugger
    this.MealsService.updateMeals(
      this.Attachment,
      this.selectedProduct.id
    ).subscribe(
      (data) => {
        this.refreshView();
        this.toasterService.success('تم تعديل صنف بنجاح', 'عملية ناجحة');
        this.modalService.dismissAll();
        this.editForm.reset();
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['/Admin/Admin-Meals']);
        });
      },
      (error) => {
        this.toasterService.error('لم يتم تعديل صنف بنجاح', 'عملية غير ناجحة');
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['/Admin/Admin-Meals']);
        });
      }
    );
  }
  selectedProduct: MealsModel;
  openEdit(content2, gov) {
    this.selectedProduct = gov;
    this.modalService.open(content2, this.ngbModalOptions);
    this.editForm.controls.nameAr.setValue(this.selectedProduct.nameAr);
    this.editForm.controls.nameEn.setValue(this.selectedProduct.nameEn);
    this.editForm.controls.count.setValue(this.selectedProduct.count);
    this.editForm.controls.price.setValue(this.selectedProduct.price);
    this.editForm.controls.recipesAr.setValue(this.selectedProduct.recipesAr);
    this.editForm.controls.recipesEn.setValue(this.selectedProduct.recipesEn);
    this.editForm.controls.categoryId.setValue(this.selectedProduct.categoryId);
  }
  openDelete(content2, gov) {
    this.selectedProduct = gov;
    this.modalService.open(content2, this.ngbModalOptions);
  }
  onDelete() {
    this.MealsService.deleteMeals(this.selectedProduct.id).subscribe(
      (data: any) => {
        this.refreshView();
        this.modalService.dismissAll();
        this.toasterService.success('تم حذف صنف بنجاح', 'عملية ناجحة');
      },
      (error) => {
        this.modalService.dismissAll();
        this.toasterService.error(
          'لا يمكن حذف هذه الصنف بسبب وجود بعض المستخدمين عليها',
          'عملية غير ناجحة'
        );
      }
    );
  }
  govs: MealsModel[];
  // search(key) {
  //   this.Meals = this.govs.filter((element) => {
  //     return element.nameAr.includes(key);
  //   });
  // }
}
