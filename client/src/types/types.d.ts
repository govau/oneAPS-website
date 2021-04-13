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

export interface IOpportunityType {
  id: string;
  jobTitle: string;
  jobDescription: string;
  whatYoullGain: string;
  aboutTeam: string;
  numberOfPeople: string;
  location: string;
  skills: string;
  additionalInfo: string;
  startDate: string;
  endDate: string;
  commitmentTime: string;
  agency: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  securityClearance: string;
}

export interface IOpportunityResponseType {
  opportunityId: number;
  resumeLink: string;
  userId: number;
  agency: string;
  whyPickMe: string;
}
