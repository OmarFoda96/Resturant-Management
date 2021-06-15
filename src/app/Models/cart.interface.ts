import { MealsModel } from './Meals.Interface';
export interface CartModel {
  meal: MealsModel;
  count: number;
  priceMeals: number;
  isDone: boolean;
  createdAt: Date;
  id: number;
}
export interface StatsModel {
  countTransactionDone: string;
  countMeal: string;
  countUserWebsite: string;
}
