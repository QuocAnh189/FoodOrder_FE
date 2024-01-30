import { ICategory } from './category.interface';

export interface IExtraPrice {
  name: string;
  price: number;
}

export interface IMenuItem {
  image: string;
  name: string;
  description: string;
  category: ICategory;
  basePrice: number;
  sizes: [IExtraPrice];
  extraIngredientPrices: [IExtraPrice];
}
