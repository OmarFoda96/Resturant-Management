import { AdminGuard } from './authSystem/services/admin.guard';
import { HomePageComponent } from './userViews/home-page/home-page.component';
import { HistoryComponent } from './userViews/history/history.component';
import { AuthGaurdGuard } from './authSystem/services/auth-gaurd.guard';
import { Error404Component } from './errors/error404/error404.component';
import { Error0Component } from './errors/error0/error0.component';
import { Error500Component } from './errors/error500/error500.component';
import { ChangePasswordComponent } from './authSystem/change-password/change-password.component';
import { ForgetPasswordComponent } from './authSystem/forget-password/forget-password.component';
import { RegisterComponent } from './authSystem/register/register.component';
import { LoginComponent } from './authSystem/login/login.component';
import { CheckoutComponent } from './userViews/checkout/checkout.component';
import { StoreMealsComponent } from './userViews/store-meals/store-meals.component';
import { MainViewComponent } from './userViews/main-view/main-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './userViews/payment/payment.component';

import { CategoriesComponent } from './adminViews/categories/categories.component';
import { StatsComponent } from './adminViews/stats/stats.component';
import { MealsComponent } from './adminViews/Meals/Meals.component';
import { SalesComponent } from './adminViews/sales/sales.component';
import { UsersComponent } from './adminViews/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        canActivate: [AuthGaurdGuard],
      },
      {
        path: 'Meals',
        component: StoreMealsComponent,
        canActivate: [AuthGaurdGuard],
      },
      {
        path: 'Past-Orders',
        component: CheckoutComponent,
        canActivate: [AuthGaurdGuard],
      },
      {
        path: 'Checkout',
        component: CheckoutComponent,
        canActivate: [AuthGaurdGuard],
      },
      {
        path: 'My-Previous-Meals',
        component: HistoryComponent,
        canActivate: [AuthGaurdGuard],
      },
      {
        path: 'Payment',
        component: PaymentComponent,
        canActivate: [AuthGaurdGuard],
      },
    ],
  },
  {
    path: 'Admin',
    component: MainViewComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: StatsComponent,
      },
      {
        path: 'Categories',
        component: CategoriesComponent,
      },
      {
        path: 'Admin-Meals',
        component: MealsComponent,
      },
      {
        path: 'Users',
        component: UsersComponent,
      },
      {
        path: 'Sales',
        component: SalesComponent,
      },
    ],
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'Forget-Password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'Change-Password',
    component: ChangePasswordComponent,
  },
  {
    path: 'Error500',
    component: Error500Component,
  },
  {
    path: 'ConnectionError',
    component: Error0Component,
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
