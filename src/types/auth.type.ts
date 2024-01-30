export type SignInType = {
  email: string;
  password: string;
};

export const InitSignIn = {
  email: '',
  password: ''
} as SignInType;

export type SignUpType = {
  email: string;
  name: string;
  password: string;
  confirmpassword: string;
};

export const InitSignUp = {
  email: '',
  name: '',
  password: '',
  confirmpassword: ''
} as SignUpType;
