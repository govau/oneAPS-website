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
        <section>
          <h2>What opportunities can I post?</h2> 
          <p>We encourage opportunities that are:</p>
          <ul className="accepted-list">
            <li>A few hours or days to a few months long</li>
            <li>Seeking digital or data skills (link to our guidance page on digital and data)</li>
            <li>Able to be completed flexibly through remote working or part time hours</li>
            <li>Do not need full onboarding to your organisation’s ICT systems</li>
            <li>Low risk</li>
            <li>Able to be completed through an informal arrangement</li>
          </ul>
          <p>The following opportunities do not fit the program:</p>
          <ul className="not-accepted-list">
            <li>Secondments or temporary transfers</li>
            <li>Opportunities where there is a change to pay and conditions</li>
            <li>Time sensitive or high-risk opportunities</li>
            <li>Opportunities which contain Sensitive or Classified information</li>
          </ul>
        </section>
      </>
    </DefaultLayout>
  );
};

export default OpportunityGuidancePage;
