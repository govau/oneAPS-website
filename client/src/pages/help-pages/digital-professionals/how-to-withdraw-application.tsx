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
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
              <li>How to withdraw an application</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <h1>How to withdraw an application</h1>
          <p>
            Currently the <span className="bolden-text">oneAPS platform</span>{" "}
            does not provide functionality to withdraw applications online. If
            you wish to withdraw an application, please contact{" "}
            <a href="mailto:digitalsquads@dta.gov.au">
              digitalsquads@dta.gov.au
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
