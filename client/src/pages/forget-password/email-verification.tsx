import * as React from "react";
import DefaultLayout from "../../components/layouts/default-layout";
import SEO from "../../components/seo";
import { PageContext } from "../../types/types";
import {ResetPasswordForm  } from "../../components/resetPassword";

// markup
const VerifyEmail: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  const from = params.get('from');
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Verify your email" />
        <ResetPasswordForm />
      </>
    </DefaultLayout>
  );
};

export default VerifyEmail;
