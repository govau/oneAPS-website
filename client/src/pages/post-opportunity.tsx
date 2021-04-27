import * as React from "react";
import PostOpportunityForm from "../components/form/postOpportunity/postOpportunity";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

const OpportunityResponsePage: React.FC<PageContext> = ({
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
        <SEO title="Post an Opportunity" />
        <PostOpportunityForm opportunityId={opportunityId} />
      </>
    </DefaultLayout>
  );
};

export default OpportunityResponsePage;
