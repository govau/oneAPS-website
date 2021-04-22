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
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/find-opportunities">Find opportunities</Link>
              </li>
              <li>Apply for opportunity</li>
            </ul>
          </nav>
        </div>
        <div className="container-fluid au-body">
          <OpportunityResponseForm />
        </div>
      </>
    </DefaultLayout>
  );
};

export default PostOpportunityPage;
