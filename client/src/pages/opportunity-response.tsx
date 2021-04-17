import * as React from "react";
import OpportunityResponseForm from "../components/form/opportunityResponse/opportunityResponseForm";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const PostOpportunityPage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Apply for Opportunity" />
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <a href="../#">Home</a>
              </li>
              <li>
                <a href="../find-opportunities">Find opportunities</a>
              </li>
              <li>Apply for opportunity</li>
            </ul>
          </nav>
        </div>
        <div className="container-fluid au-body">
          <OpportunityResponseForm />
        </div>
        <section className="au-body center-align">
          This site is part of a 3-month pilot program from March to May 2021
          run by the Digital Squads team at the Digital Transformation Agency.
          <br />
          If you have any questions or feedback, please contact us at{" "}
          <a href="mailto:digitalsquads@dta.gov.au">digitalsquads@dta.gov.au</a>
        </section>
      </>
    </DefaultLayout>
  );
};

export default PostOpportunityPage;
