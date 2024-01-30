export interface IOrder {
  userEmail: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  cartProducts: any;
  paid: boolean;
}
