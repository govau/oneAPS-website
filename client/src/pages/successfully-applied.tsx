import React, { useEffect } from "react";
import { Link } from "gatsby";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { useOpportunityHook } from "../hooks";


const Content: React.FC<{opportunityId: number}> = ({opportunityId}) => {
  const { loadFn, data } = useOpportunityHook();
  useEffect(() => {
    loadFn(opportunityId);
  }, []);

  return (
    <>
    {data && (
      <>
        <h1>You have applied for an opportunity</h1>
        <p>Your application for {data.jobTitle} has been received.</p>
        <p>If you have any questions or would like to withdraw your application, please contact <a href="mailto:digitalsquads@dta.gov.au">digitalsquads@dta.gov.au</a>.</p>
        <p>Your next steps</p>
          <ul>
            <li><Link to={`/find-opportunities`}>Find</Link> more opportunities</li>
            <li><Link to={`/dashboard`}>Withdraw</Link> your application</li>
          </ul>
      </>
    )}
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
        <SEO title="Successfully Applied for opportunity" />
        <Content opportunityId={opportunityId} />
      </>
    </DefaultLayout>
  );
};

export default SuccessfullyApplied;
