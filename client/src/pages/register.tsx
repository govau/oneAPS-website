import { Link } from "gatsby";
import * as React from "react";
import RegisterForm from "../components/form/registerForm/registerForm";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const RegisterPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Register" />
        <div className="container-fluid au-body">
          <h1>Register</h1>
          <p>Already have an account? {<Link to="/login">Login</Link>}</p>
          <RegisterForm />
        </div>
      </>
    </DefaultLayout>
  );
};

export default RegisterPage;
