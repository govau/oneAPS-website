import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const EmailConfirmation: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Register" />
        <h1>Please check you email</h1>
        <p>A confirmation link is on it’s way to you to get started.</p>
      </>
    </DefaultLayout>
  );
};

export default EmailConfirmation;
