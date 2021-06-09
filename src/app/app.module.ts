import { UsersComponent } from './adminViews/users/users.component';
import { SalesComponent } from './adminViews/sales/sales.component';
import { MealsComponent } from './adminViews/Meals/Meals.component';
import { CategoriesComponent } from './adminViews/categories/categories.component';
import { StatsComponent } from './adminViews/stats/stats.component';
import { TokenInterceptor } from './authSystem/services/token.interceptor';
import { Error500Component } from './errors/error500/error500.component';
import { Error404Component } from './errors/error404/error404.component';
import { Error0Component } from './errors/error0/error0.component';
import { ChangePasswordComponent } from './authSystem/change-password/change-password.component';
import { ForgetPasswordComponent } from './authSystem/forget-password/forget-password.component';
import { RegisterComponent } from './authSystem/register/register.component';
import { LoginComponent } from './authSystem/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { MainViewComponent } from './userViews/main-view/main-view.component';
import { StoreMealsComponent } from './userViews/store-meals/store-meals.component';
import { CheckoutComponent } from './userViews/checkout/checkout.component';
import { NavbarComponent } from './userViews/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CountComponent } from './shared/count/count.component';
import { MealsCardComponent } from './userViews/store-meals/meal-card/meals-card.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './userViews/payment/payment.component';
import { HistoryComponent } from './userViews/history/history.component';
import { HomePageComponent } from './userViews/home-page/home-page.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainViewComponent,
    SpinnerComponent,
    CountComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    Error0Component,
    Error404Component,
    Error500Component,
    StoreMealsComponent,
    CheckoutComponent,
    MealsCardComponent,
    PaymentComponent,
    HistoryComponent,
    HomePageComponent,

    StatsComponent,
    CategoriesComponent,
    MealsComponent,
    SalesComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
