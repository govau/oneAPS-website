export interface IUserType {
  name: string;
  email: string;
  password: string;
}

export interface ILoginType {
  email: string;
  password: string;
}

declare module "express-session" {
  interface Session {
    email?: string;
    userId?: string;
    confirmed?: string;
  }

  interface Request {
    render: any;
  }
}

export interface IForgotPasswordType {
  email: string;
}

export interface IResetPasswordType {
  password: string;
  key: string;
}
