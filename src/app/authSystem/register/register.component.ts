import { UserModel } from './../../Models/user.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthSystemsService } from '../services/auth-systems.service';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe],
})
export class RegisterComponent implements OnInit {
  profilePicture: any = '../../assets/profile-unknown.png';

  public imagePath;
  selectedFile: File;
  nationalNumber: string;
  fileUploaded = false;
  fileType = true;
  loading = false;
  url = environment.base_url;

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

  constructor(
    private toastrService: ToastrService,
    private authService: AuthSystemsService,
    private datePipe: DatePipe,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  userData: UserModel;

  ngOnInit(): void {}

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
        this.loading = false;
        this.toastrService.success('تم اضافة المستخدم بنجاح', 'عملية ناجحة');
        // this.router.navigate(['/Login']);
        this.form.reset();
        location.href = '/Login';
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
  open(content) {
    this.modalService.open(content, {
      size: 'lg',
      scrollable: true,
      centered: true,
    });
  }
  goUpload() {
    this.modalService.dismissAll();
    const profileIMg = document.getElementById('profilePicture');
    profileIMg.click();
  }
}
