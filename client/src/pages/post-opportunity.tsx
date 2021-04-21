import * as React from "react";
import PostOpportunityForm from "../components/form/postOpportunity/postOpportunity";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { Link } from "gatsby";

const OpportunityResponsePage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  let opportunityId: number;
  if (params.get('opportunityId')) {
    opportunityId = parseInt(params.get('opportunityId'), 10);
  }
  let title: string;
  if (params.get('title')) {
    title = params.get('title');
  }

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Post an Opportunity" />
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              {opportunityId ? (
                <>
                  <li>
                    <Link to="/find-opportunities">Find opportunities</Link>
                  </li>
                  <li>
                    <Link to={`/detailed-opportunity/?opportunityId=${opportunityId}`}>{decodeURI(title)}</Link>
                  </li>
                  <li>Edit opportunity</li>
                </>
              ) : (
                <li>Post an opportunity</li>
              )}
            </ul>
          </nav>
        </div>
        <div className="container-fluid au-body">
          <h1>{opportunityId ? 'Edit ' : 'Post an '}opportunity</h1>
          <PostOpportunityForm opportunityId={opportunityId} />
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

export default OpportunityResponsePage;
