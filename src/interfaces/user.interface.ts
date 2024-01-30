export interface IUserInfo {
  _id: string;
  userId: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  role: string | boolean;
}

export interface IUser {
  _id?: string;
  email: string;
  avatar: string;
  name: string;
  info: IUserInfo;
  isActive: Date;
  refreshToken: string;
}
