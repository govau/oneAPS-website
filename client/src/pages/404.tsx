import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const ErrorPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="404" />
        <div className="container-fluid au-body">
          <h1>404 - page not found</h1>
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

export default ErrorPage;
