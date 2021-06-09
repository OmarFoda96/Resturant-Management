import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toasterService: ToastrService) {}
  decodedToken: any;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (localStorage.getItem('userToken')) {
      const authRequest = request.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer' + ' ' + localStorage.getItem('userToken'),
        }),
      });
      return next.handle(authRequest).pipe(
        catchError((error: any) => {
          if (error.status == 400) {
            let errorMsg = error.error;
            if (errorMsg.goToRegister) {
              this.router.navigate(['/Register']);
              localStorage.setItem('logState', 'false');
              return throwError(error);
            } else {
              this.toasterService.error(errorMsg.nameAr, 'عملية غير ناجحة');
              return throwError(error);
            }
          } else if (error.status == 500) {
            this.router.navigate(['/Error500']);
            return throwError(error);
          } else {
            this.router.navigate(['/ConnectionError']);
            return throwError(error);
          }
        })
      );
    } else {
      console.log('error');
    }
  }
}
