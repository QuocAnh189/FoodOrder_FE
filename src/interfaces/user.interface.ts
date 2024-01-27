export interface IUser {
  _id?: string;
  email: string;
  avatar: string;
  firstname: string;
  lastname: string;
  fullname: string;
  dob: Date;
  refreshToken: string;
}
