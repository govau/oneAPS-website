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
          <ol className="au-link-list au-link-list--inline workflow">
            <li className="margin-1 workflow-item">
              <img alt="" src="/desktop.png"/>
              <p className="workflow-text">Post opportunity</p>
            </li>
            <li className="margin-1 workflow-item">
              <img alt="" src="/application.png"/>
              <p className="workflow-text">Decide on an applicant</p>
            </li>
            <li className="margin-1 workflow-item">
              <img alt="" src="/agreement.png"/>
              <p className="workflow-text">Agree on an informal arrangement</p>
            </li>
            <li className="margin-1 workflow-item">
              <img alt="" src="/completion.png"/>
              <p className="workflow-text">Complete opportunity</p>
            </li>
          </ol>
          <p>For more information, see <Link to="/help-pages/3-creating-an-opportunity/">Creating an opportunity</Link>.</p>
        </section>
        <section>
          <Link className="au-btn margin-top-1" to="/post-opportunity">Continue to post opportunity</Link>
        </section>
      </>
    </DefaultLayout>
  );
};

export default OpportunityGuidancePage;
