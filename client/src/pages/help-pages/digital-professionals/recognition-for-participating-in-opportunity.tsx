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
            <li>Do I get recognition for participating in an opportunity?</li>
          </ul>
        </nav>
        <h1>Do I get recognition for participating in an opportunity?</h1>
        <p>
          It only takes a few minutes to create and post an opportunity.
          Before you get started, If you work on and complete an opportunity,
          you will see a <span className="bolden-text">Completed status</span>{" "}
          for that opportunity. You will also see a link to download and print
          a <span className="bolden-text">Certificate of Completion</span>.
          You may also receive a badge based on the number of opportunities
          you complete.
        </p>
      </>
    </DefaultLayout>
  );
};

export default AboutPage;
