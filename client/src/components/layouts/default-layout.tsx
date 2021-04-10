/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { Location } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import _ from "lodash";
import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import "../../sass/main.scss";
import Breadcrumbs from "../navigation/breadcrumb";
import Footer from "../navigation/footer";
import Header from "../navigation/header";
import MainNav from "../navigation/main-nav";

interface Props {
  children: React.ReactElement;
  pageContext?: any;
  location: any;
}

const logout = () => {
  localStorage.setItem("session", null);
  // navigate("/find-opportunities/");
}

const DefaultLayout: React.FC<Props> = ({
  pageContext,
  location,
  children,
}) => {
  useEffect(() => {
    const ping = async () => {
      const sessionStr = localStorage.getItem("session");
      if (!sessionStr) {
        logout();
        return;
      }
      let session = JSON.parse(sessionStr);
      const result = await axios.get(
        `/api/user/ping`, {
          headers: {
            'Authorization': `bearer ${session.token}`
          }
        }
      );
      if (result.status === 200) {
        
        session.refreshToken = result.data.refreshToken;
        localStorage.setItem("session", JSON.stringify(session));
        return;
      } else {
        logout();
        return;
      }
    }
    ping();
  }, []);


  let crumbs = [];

  if (pageContext && pageContext.breadcrumb) {
    crumbs = pageContext.breadcrumb.crumbs;
  }

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      {/* <AlphaHeader /> */}
      {/* <SEO title={data.site.siteMetadata.title} /> */}
      <div className="header-wrapper">
        <Header siteTitle={data.site.siteMetadata.title} />
        <Location>
          {({ navigate, location }) => <MainNav path={location.pathname} />}
        </Location>
      </div>
      <main>
        {/* {!_.isEmpty(crumbs) && crumbs.length > 2 && (
          <div className="container-fluid">
            <Breadcrumbs crumbs={crumbs} />
          </div>
        )} */}
        {children}
      </main>
      <Footer path={location.pathname} />
    </>
  );
};

export default DefaultLayout;
