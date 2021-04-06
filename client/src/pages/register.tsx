import * as React from "react";
import RegisterForm from "../components/form/registerForm/registerForm";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const IndexPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Register" />
        <div className="container-fluid au-body">
            <h1>Regsiter</h1>
            <RegisterForm />
        </div>
      </>
    </DefaultLayout>
  );
};

export default IndexPage;
