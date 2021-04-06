/* eslint-disable @typescript-eslint/no-unused-vars */
import { Location } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import _ from "lodash";
import React from "react";
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

const DefaultLayout: React.FC<Props> = ({
  pageContext,
  location,
  children,
}) => {
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
