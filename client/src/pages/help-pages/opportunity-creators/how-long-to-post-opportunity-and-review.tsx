import * as React from "react";
import DefaultLayout from "../../../components/layouts/default-layout";
import SEO from "../../../components/seo";
import { PageContext } from "../../../types/types";
import { Link } from "gatsby";

// markup
const AboutPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="About oneAPS" />
        <nav className="au-breadcrumbs" aria-label="breadcrumb">
          <ul className="au-link-list au-link-list--inline">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              How long does it take to post an opportunity and review
              applicants?
              </li>
          </ul>
        </nav>
        <h1>
          How long does it take to post an opportunity and review applicants?
          </h1>
        <p>
          It only takes a few minutes to create and post an opportunity.
            Before you get started,{" "}
          <Link to="/help-pages/opportunity-creators/write-a-great-opportunity">
            read these tips on how to write a great opportunity.
            </Link>
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
      </>
    </DefaultLayout>
  );
};

export default AboutPage;
