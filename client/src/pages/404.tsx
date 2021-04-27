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
        <div>
          <h1>404 - page not found</h1>
        </div>
      </>
    </DefaultLayout>
  );
};

export default ErrorPage;
