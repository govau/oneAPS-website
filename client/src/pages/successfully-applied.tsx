import React, { useEffect } from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { useOpportunityHook, useLookupHook } from "../hooks";


const Content: React.FC<{opportunityId: number}> = ({opportunityId}) => {
  const { getText } = useLookupHook('agency');
  const { loadFn, data } = useOpportunityHook();
  useEffect(() => {
    loadFn(opportunityId);
  }, []);

  return (
    <>
    {data && (
      <>
        <h1>You have applied for an opportunity</h1>
        <p>Your application for "{data.jobTitle}" has been received.</p>
        <p>{data.contactPersonName} from {getText(data.agency)} will be in contact regarding the results of the opportunity.<br/>Good luck on your application!</p>
        <p>If you have any questions or would like to withdraw your application, please contact <a href="mailto:digitalsquads@dta.gov.au">digitalsquads@dta.gov.au</a>.</p>
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
