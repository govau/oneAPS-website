import React from "react";
import AUpageAlert from "../../auds/react/page-alerts";

const AuPageAlert: any = AUpageAlert;

interface Props {
  type: string;
  children: React.ReactElement;
  className?: string;
}
const PageAlert: React.FC<Props> = ({ type, children, className }) => {
  return (
    <AuPageAlert as={type} className={className}>
      {children}
    </AuPageAlert>
  );
};

export default PageAlert;
