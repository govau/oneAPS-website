import * as React from "react";
import OpportunityResponseForm from "../components/form/opportunityResponse/opportunityResponseForm";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { Link } from "gatsby";

// markup
const PostOpportunityPage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Apply for Opportunity" />
        <OpportunityResponseForm />
      </>
    </DefaultLayout>
  );
};

export default PostOpportunityPage;
