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
        <section>
          <h1>Post an opportunity</h1>
          <h2 className="au-display-md">We are trialling a new approach to mobility</h2>
          <p>Any Commonwealth government employee can post an opportunity.</p>
          <p>An opportunity is like a 'micro-assignment' where staff can work on a task, 
            in a role or on a program for a short period of time.</p>
          <p>We encourage opportunities that are:</p>
          <ul className="accepted-list">
            <li>A few hours or days to a few months long</li>
            <li>Seeking digital or data skills</li>
            <li>Able to be completed flexibly by remote working or part-time</li>
            <li>Do not need onboarding to your organisation’s ICT systems</li>
          </ul>
          <p>The following opportunities do not fit the program:</p>
          <ul className="not-accepted-list">
            <li>Secondments or temporary transfers</li>
            <li>Opportunities where there is a change to pay and conditions</li>
            <li>Time sensitive or high-risk opportunities</li>
            <li>Opportunities which contain Sensitive or Classified information</li>
          </ul>
        </section>
        <section>
          <h2 id="how-it-works" className="au-display-md">How it works</h2>
          <p>For more information, see <Link to="/help-pages/3-creating-an-opportunity/">Creating an opportunity</Link></p>
        </section>
        <section>
          <h2 id="shape-the-future" className="au-display-md">Help us shape the future of this initiative</h2>
          <p>We will get in touch to seek your feedback and provide support.</p>
          <Link className="au-btn margin-top-1" to="/post-opportunity">Continue</Link>
        </section>
      </>
    </DefaultLayout>
  );
};

export default OpportunityGuidancePage;
