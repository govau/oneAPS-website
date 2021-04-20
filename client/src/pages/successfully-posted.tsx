import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const SuccessfullyPosted: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Register" />
        <div className="container-fluid au-body">
          <h1>You have posted an opportunity</h1>
          <p>Your next steps:</p>
        </div>
      </>
    </DefaultLayout>
  );
};

export default SuccessfullyPosted;
