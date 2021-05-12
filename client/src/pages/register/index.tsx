import { Link } from "gatsby";
import * as React from "react";
import RegisterForm from "./registerForm";
import DefaultLayout from "../../components/layouts/default-layout";
import SEO from "../../components/seo";
import { PageContext } from "../../types/types";

// markup
const Index: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Register" />
        <nav className="au-breadcrumbs" aria-label="breadcrumb">
          <ul className="au-link-list au-link-list--inline">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Register</li>
          </ul>
        </nav>
        <h1>Register</h1>
        <p>Already have an account? {<Link to="/login">Login</Link>}</p>
        <RegisterForm />
      </>
    </DefaultLayout>
  );
};

export default Index;
