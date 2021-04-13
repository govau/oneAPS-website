import { Link } from "gatsby";
import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const LogoutPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Login" />

        <div className="container-fluid au-body">
          <p>Are you sure you want to logout? </p>
          <br />
          <Link to="../#" className="au-btn">
            Logout
          </Link>
        </div>
      </>
    </DefaultLayout>
  );
};

export default LogoutPage;
