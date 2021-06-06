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
  emailAddress: string;
  password: string;
  agency: string;
  mobile: string;
}

export interface ILoginType {
  email: string;
  password: string;
}

export interface IEmailVerificationType {
  verificationCode: string;
  userId: number;
}

export interface IVerifyResetPasswordType {
  emailAddress: string;
}

export interface IResetPasswordType {
  verificationCode: string;
  password: string;
  retypePassword: string;
}

export interface IApiFormError {
  path: string;
  message: string;
}

export interface IOpportunityType {
  id: number;
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
  publishedAt: string;
  closedAt: string;
  commitmentTime: string;
  agency: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  securityClearance: string;
  canModify: boolean;
  canApply: boolean;
  numberOfResponses: number;
}

export interface IOpportunityResponseType {
  id?: number;
  opportunityId: number;
  resumeLink?: string;
  resumeUpload?: string;
  userId: number;
  whyPickMe?: string;
  opportunity?: IOpportunityType; 
  user?: IUserType;
  submittedAt?: string;
  withdrawnAt?: string;
}

export interface IUserType {
  id?: number;
  name: number;
  emailAddress: string;
  mobile: string;
  userId: number;
  emailVerified: boolean;
}
