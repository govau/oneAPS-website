import React, { useEffect } from "react";
import { Link } from "gatsby";
import DefaultLayout from "../../components/layouts/default-layout";
import SEO from "../../components/seo";
import { PageContext } from "../../types/types";


const Content: React.FC<{opportunityId: number}> = ({opportunityId}) => {

  return (
    <>
      <h1>Your password is updated successfully</h1>
      <p>You can now <Link to="/login">login</Link> with your email address and updated password</p>
      <p>If you have any questions, please contact <a href="mailto:specialist.advice@apsc.gov.au">specialist.advice@apsc.gov.au</a>.</p>
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
