import React, { useEffect } from "react";
import { Link } from "gatsby";
import DefaultLayout from "../../components/layouts/default-layout";
import SEO from "../../components/seo";
import { PageContext } from "../../types/types";


const Content: React.FC<{opportunityId: number}> = ({opportunityId}) => {

  return (
    <>
      <h1>You have registered successfully</h1>
      <p>Your next steps:</p>
      <ul>
        <li>Check your email for the one time verification code.</li>
        <li><Link to="/login">Login</Link> using your email and password.</li>
        <li>Enter the verification code from your email when prompted.</li>
      </ul>
      <p>If you have any questions, please contact <a href="mailto:specialist.advice@dta.gov.au">specialist.advice@dta.gov.au</a>.</p>
    </>
  );
}

const SuccessfullyApplied: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  let opportunityId: number;
  if (params.get('opportunityId')) {
    opportunityId = parseInt(params.get('opportunityId'), 10);
  }


  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Successfully registered" />
        <Content opportunityId={opportunityId} />
      </>
    </DefaultLayout>
  );
};

export default SuccessfullyApplied;
