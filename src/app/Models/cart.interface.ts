import { MealsModel } from './Meals.Interface';
export interface CartModel {
  product: MealsModel;
  count: number;
  priceProduct: number;
  isDone: boolean;
  createdAt: Date;
  id: number;
}
export interface StatsModel {
  countTransactionDone: string;
  countProduct: string;
  countUserWebsite: string;
}
