import { navigate } from "gatsby";
import React, { useContext } from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { UserContext } from "../context/UserContext";


const LogoutButton: React.FC = () => {
  const user = useContext(UserContext);
  return (
    <button
      className="au-btn"
      onClick={(e) => {
        e.preventDefault();
        user.updateToken();
        navigate("/");
      }}
    >
      Logout
    </button>
  );
}

const LogoutPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Login" />

        <div className="container-fluid au-body">
          <p>Are you sure you want to logout? </p>
          <br />
          <LogoutButton />
        </div>
      </>
    </DefaultLayout>
  );
};

export default LogoutPage;
