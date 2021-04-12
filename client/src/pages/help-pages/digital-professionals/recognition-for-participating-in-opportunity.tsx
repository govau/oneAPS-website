import * as React from "react";
import DefaultLayout from "../../../components/layouts/default-layout";
import SEO from "../../../components/seo";
import { PageContext } from "../../../types/types";

// markup
const AboutPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="About oneAPS" />
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <a href="../../../#">Home</a>
              </li>
              <li>
                <a href="../../help">Help</a>
              </li>
              <li>
                How long does it take to post an opportunity and review
                applicants?
              </li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <h1>
            How long does it take to post an opportunity and review applicants?
          </h1>
          <p>
            It only takes a few minutes to create and post an opportunity.
            Before you get started,{" "}
            <a href="write-a-great-opportunity">
              read these tips on how to write a great opportunity.
            </a>
          </p>
          <p>
            How you review applicants is up to you. We encourage you to review
            each applicant profile and have a quick phone call or email exchange
            to see if they’re the right person for the work.
          </p>
          <p>
            Once you have chosen an applicant for your opportunity, please
            inform{" "}
            <a href="mailto:digitalsquads@dta.gov.au">
              The DTA Digital Squads team
            </a>
          </p>
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

export default AboutPage;
