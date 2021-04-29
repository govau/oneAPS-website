import { Link } from "gatsby";
import * as React from "react";
import LoginForm from "../components/form/login/loginForm";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const LoginPage: React.FC<PageContext> = ({ pageContext, location }) => {
  const params = new URLSearchParams(location.search);
  const from = params.get('from');
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Login" />
        <h1>Login </h1>
        <p>Don't have an account? {<Link to="/register">Register</Link>}</p>
        <LoginForm fromPage={from} />
      </>
    </DefaultLayout>
  );
};

export default LoginPage;
