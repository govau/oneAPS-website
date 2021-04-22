import { navigate } from "gatsby";
import React, { useContext } from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { OpportunityResponsesList } from '../components/dashboard';

const OpportunityResponses: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  const opportunityId = parseInt(params.get('opportunityId'), 10);
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <SEO title="Opportunity Responses" />
      <OpportunityResponsesList opportunityId={opportunityId} />
    </DefaultLayout>
  );
};

export default OpportunityResponses;
