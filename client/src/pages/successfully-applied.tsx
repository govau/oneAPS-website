import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const SuccessfullyApplied: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Register" />
        <h1>You have applied for an opportunity</h1>
        <p>You can find more opportunities here</p>
      </>
    </DefaultLayout>
  );
};

export default SuccessfullyApplied;
