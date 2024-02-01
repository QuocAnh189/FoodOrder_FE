import { ICategory } from './category.interface';

export interface IExtraPrice {
  _id?: string;
  name: string;
  price: number;
}

export interface IMenuItem {
  _id?: string;
  image: string | undefined;
  name: string | undefined;
  description: string | undefined;
  category: ICategory | string | undefined;
  basePrice: number | undefined;
  sizes: IExtraPrice[];
  extraIngredientPrices: IExtraPrice[];
}
