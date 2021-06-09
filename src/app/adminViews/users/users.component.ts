import { Router } from '@angular/router';
import { AuthSystemsService } from './../../authSystem/services/auth-systems.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/Models/user.interface';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriesModel } from 'src/app/Models/Categories.interface';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  dataLoaded = false;
  url = environment.base_url;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private userService: UsersService,
    private authService: AuthSystemsService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngbModalOptions = { size: 'lg', scrollable: true, centered: true };
  users: UserModel[];

  ngOnInit(): void {
    this.refreshView();
  }
  govs;
  refreshView() {
    this.dataLoaded = false;
    this.userService.getAllUsers().subscribe((data: any) => {
      this.dataLoaded = true;
      let hos2: any[] = data;
      this.govs = data;
      this.users = hos2
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      this.collectionSize = this.users.length;
    });
  }

  open(content) {
    this.modalService.open(content, this.ngbModalOptions);
  }
  selectedGov: UserModel;
  search(key) {
    this.users = this.govs;
    if (key.value != 'null') {
      this.users = this.govs.filter((element: UserModel) => {
        return element.fullName.includes(key.value);
      });
    }
  }
  searchByPhone(key) {
    this.users = this.govs;
    if (key.value != 'null') {
      this.users = this.govs.filter((element: UserModel) => {
        return element.phone.includes(key.value);
      });
    }
  }
  searchByBalance(key) {
    this.users = this.govs;
    if (key.value != 'null') {
      this.users = this.govs.filter((element: UserModel) => {
        return element.balance.includes(key.value);
      });
    }
  }

  profilePicture: any = '../../assets/profile-unknown.png';

  public imagePath;
  selectedFile: File;
  nationalNumber: string;
  fileUploaded = false;
  fileType = true;
  loading = false;
  userData: UserModel;

  form: FormGroup = new FormGroup({
    Username: new FormControl(null, [Validators.required]),
    Password: new FormControl(null, [Validators.required]),
    FullName: new FormControl(null, [Validators.required]),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Gender: new FormControl(null, [Validators.required]),
    Birthday: new FormControl(null, [Validators.required]),
    Address: new FormControl(null, [Validators.required]),
    Phone: new FormControl(null, [Validators.required]),
    Roles: new FormControl(null, [Validators.required]),
    Balance: new FormControl(0, [Validators.required]),
  });
  get Username() {
    return this.form.controls.Username;
  }
  get Password() {
    return this.form.controls.Password;
  }
  get FullName() {
    return this.form.controls.FullName;
  }
  get Email() {
    return this.form.controls.Email;
  }
  get Gender() {
    return this.form.controls.Gender;
  }
  get Birthday() {
    return this.form.controls.Birthday;
  }
  get Address() {
    return this.form.controls.Address;
  }
  get Phone() {
    return this.form.controls.Phone;
  }
  get Roles() {
    return this.form.controls.Phone;
  }
  Photo = new FormData();

  preview(e) {
    this.selectedFile = e.target.files[0];
    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      this.fileUploaded = true;
      this.fileType = true;

      if (this.Photo.get('Photo')) {
        this.Photo.set('Photo', this.selectedFile, this.selectedFile.name);
      } else {
        this.Photo.append('Photo', this.selectedFile, this.selectedFile.name);
      }
    } else {
      this.fileType = false;
      this.fileUploaded = false;
    }

    let reader = new FileReader();
    this.imagePath = e.target.files;
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_e) => {
      this.profilePicture = reader.result;
    };
  }

  onSubmit() {
    for (const key in this.form.value) {
      if (key !== 'Photo') {
        this.Photo.append(key, this.form.value[key]);
      }
    }
    if (!this.Photo.get('Photo')) {
      !this.form.valid;
    }

    this.loading = true;
    this.authService.registerUser(this.Photo).subscribe(
      (data: any) => {
        this.modalService.dismissAll();
        this.loading = false;
        this.toastrService.success('تم اضافة المستخدم بنجاح', 'عملية ناجحة');
        // this.router.navigate(['/Login']);
        this.form.reset();
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['/Admin/Users']);
        });
      },
      (error) => {
        this.loading = false;
        this.toastrService.error('لم يتم اضافة المستخدم', 'عملية غير ناجحة');
        for (const key in this.form.value) {
          if (key !== 'Photo') {
            this.Photo.delete(key);
          }
        }
      }
    );
  }

  selectedUser: UserModel;
  deleteUser(content2, item) {
    this.selectedUser = item;
    this.modalService.open(content2);
  }
  confirmDelete() {
    this.userService.deleteUsers(this.selectedUser.id).subscribe((data) => {
      this.toastrService.success('تم حذف المستخدم بنجاح', 'عملية ناجحة');
      this.modalService.dismissAll();
      this.refreshView();
    });
  }
}
