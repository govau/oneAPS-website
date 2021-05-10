import { navigate } from "gatsby";
import React, { useContext } from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { MyResponse } from '../components/dashboard';

const OpportunityResponseView: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('opportunityResponseId'), 10);
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Opportunity Application" />
        <MyResponse opportunityResponseId={id} />
      </>
    </DefaultLayout>
  );
};

export default OpportunityResponseView;
