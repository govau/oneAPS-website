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
              <li>Do I get recognition for participating in an opportunity?</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
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
