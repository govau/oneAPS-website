import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { Link } from "gatsby";
import { PageContext } from "../types/types";

const OpportunityGuidancePage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Post an Opportunity" />
        <nav className="au-breadcrumbs" aria-label="breadcrumb">
          <ul className="au-link-list au-link-list--inline">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Post an opportunity</li>
          </ul>
        </nav>
        <h1>Post an opportunity</h1>
        <p>
          We are trialling a new approach to mobility in government. Here's some
          information to help you decide if this is the right place for you.
        </p>
        <section>
          <h2>Who can post an opportunity?</h2>
          <p>Any Commonwealth government employee can post an opportunity.</p>
        </section>
      </>
    </DefaultLayout>
  );
};

export default OpportunityGuidancePage;
