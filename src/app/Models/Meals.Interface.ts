import { CategoriesModel } from './Categories.interface';

export interface MealsModel {
  id: number;
  image: string;
  count: number;
  price: number;
  recipesAr: string;
  recipesEn: string;
  nameAr: string;
  nameEn: string;
  categoryId: number;
  category: CategoriesModel;
  attachment: string[];
  countRefund: number;
}
