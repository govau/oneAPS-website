import React from "react";
import {
  AUformGroup,
  AUerrorText,
  AUfieldset,
  AUlegend,
} from "../auds/react/form";
import { AUcheckbox } from "../auds/react/control-input";
import AUheader, { AUheaderBrand } from "../auds/react/header";
import AUmainNav, { AUmainNavContent } from "./ds/main-nav";
import AUbreadcrumbs from "../auds/react/breadcrumbs";
import AUselect from "../auds/react/select";
import AUlinkList from "../auds/react/link-list";
import AUtextInput from "../auds/react/text-inputs";
import AUcard, {
  AUcardInner,
  AUcardTitle,
  AUcardLink,
} from "../auds/react/card";
import AUfooter, { AUfooterEnd, AUfooterNav } from "../auds/react/footer";
import AUbutton from "../auds/react/buttons";
import AUsearchbox from "../auds/react/searchbox";
import { AUcallout } from "../auds/react/callout";
import AUtagList from "../auds/react/tags";
import AUsideNav from "../auds/react/side-nav";
import {} from "./accordion";

export const AuFormGroup: any = AUformGroup;
export const AuErrorText: any = AUerrorText;
export const AuFieldset: any = AUfieldset;
export const AuLegend: any = AUlegend;
export const AuCheckbox: any = AUcheckbox;
export const AUHeader: any = AUheader;
export const Brand: any = AUheaderBrand;
export const Nav: any = AUmainNav;
export const NavContent: any = AUmainNavContent;
export const AuBreadcrumbs: any = AUbreadcrumbs;
export const AuSelect: any = AUselect;
export const AuTextInput: any = AUtextInput;
export const AuCard: any = AUcard;
export const AuCardInner: any = AUcardInner;
export const AuCardTitle: any = AUcardTitle;
export const AuCardLink: any = AUcardLink;
export const AuLinkList: any = AUlinkList;
export const AuFooter: any = AUfooter;
export const FooterNav: any = AUfooterNav;
export const FooterEnd: any = AUfooterEnd;
export const Aubtn: any = AUbutton;
export const AuSearchBox: any = AUsearchbox;
export const AuCallout: any = AUcallout;
export const AuSideNav: any = AUsideNav;

export const AuTagList: any = AUtagList;

interface LabelProps {
  text?: string;
  dark?: string;
  inline?: boolean;
  className?: string;
  [x: string]: any;
}

export const AuLabel: React.FC<LabelProps> = ({
  text,
  dark,
  inline,
  className,
  ...attributeOptions
}) => (
  <label
    className={
      `au-label ${className}` +
      `${dark ? " au-label--dark" : ""}` +
      `${inline ? " au-label--inline" : ""}`
    }
    {...attributeOptions}
  >
    {text}
  </label>
);

interface HintTextProps {
  text?;
  dark?: string;
  inline?: boolean;
  className?: string;
  [x: string]: any;
}

export const AuHintText: React.FC<HintTextProps> = ({
  text,
  dark,
  alt,
  className,
  ...attributeOptions
}) => (
  <span
    className={
      `au-hint-text ${className}` +
      `${alt ? " au-hint-text--alt" : ""}` +
      `${dark ? " au-hint-text--dark" : ""}`
    }
    {...attributeOptions}
  >
    {text}
  </span>
);
