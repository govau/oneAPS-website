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
              <li>Can my work count as training?</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <h1>Can my work count as training?</h1>
          <p>
            Yes, <span className="bolden-text">oneAPS</span> offers short term
            opportunities that can equate to training. Talk to your manager
            about how your work can count as training.
          </p>
        </div>
      </>
    </DefaultLayout>
  );
};

export default AboutPage;
