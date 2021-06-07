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
            <li>How to withdraw an application</li>
          </ul>
        </nav>
        <h1>How to withdraw an application</h1>
        <p>
          Currently the <span className="bolden-text">oneAPS platform</span>{" "}
            does not provide functionality to withdraw applications online. If
            you wish to withdraw an application, please contact{" "}
          <a href="mailto:specialist.advice@dta.gov.au">specialist.advice@dta.gov.au</a>
        </p>
      </>
    </DefaultLayout>
  );
};

export default AboutPage;
