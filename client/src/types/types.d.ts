export interface PageContext {
  pageContext: any;
  location: any;
}

export interface PageContext {
  pageContext: any;
  location: any;
}

export interface MenuItems {
  map(
    arg0: (menuItem: any) => { text: any; link: any; active: boolean }
  ): MenuItems;
  items: Array<MenuItem>;
}

interface MenuItem {
  link: string;
  text: string;
}

interface DtaBlogType {
  link: string;
  text: string;
}

interface SelectOptionType {
  value?: string;
  text: string;
}

export interface IRegisterType {
  name: string;
  email: string;
  password: string;
  agency: string;
  mobile: string;
}

export interface ILoginType {
  email: string;
  password: string;
}

export interface IApiFormError {
  path: string;
  message: string;
}
