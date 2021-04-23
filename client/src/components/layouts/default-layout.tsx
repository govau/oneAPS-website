/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { Location } from "@reach/router";
import { graphql, useStaticQuery, navigate } from "gatsby";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import "../../sass/main.scss";
import Breadcrumbs from "../navigation/breadcrumb";
import Footer from "../navigation/footer";
import Header from "../navigation/header";
import MainNav from "../navigation/main-nav";
import { UserContext, UserContextType, UserType } from "../../context/UserContext";

interface Props {
  children: React.ReactElement;
  pageContext?: any;
  location: any;
}

const isBrowser = typeof window !== "undefined"

const getSession = () => {
  if (isBrowser) {
    const sessionStr = localStorage.getItem("session");
    if (!sessionStr) {
      return undefined;
    }
    return JSON.parse(sessionStr);
  }
  return undefined;
}


const setSession = (session) => {
  if (isBrowser) {
    localStorage.setItem("session", JSON.stringify(session));
  }
}

const removeSession = () => {
  if (isBrowser) {
    localStorage.removeItem("session");
  }
}

const logout = () => {
  removeSession();
  navigate("/");
}

const DefaultLayout: React.FC<Props> = ({
  pageContext,
  location,
  children,
}) => {

  const updateToken = (token: string, refreshToken: string, user: UserType) => {
    if (token) {
      setSession({
        token,
        refreshToken,
        user
      });
    } else {
      removeSession();
    }
    currentUser.token = token;
    currentUser.refreshToken = refreshToken;
    currentUser.user = user;
    setCurrentUserState(currentUser);

  };
  const updateRefreshToken = (refreshToken: string) => {
    const session = getSession();
    if (session) {
      session.refreshToken = refreshToken;
      setSession(session);
    }
    currentUser.refreshToken = refreshToken;
    setCurrentUserState(currentUser);
  };

  const session = getSession();
  const [currentUser, setCurrentUserState] = useState<UserContextType>({
    token: session && session.token,
    refreshToken: session && session.refreshToken,
    user: {
      userId: session && session.user.userId,
      name: session && session.user.name,
      role: session && session.user.role,
      emailAddress: '',
      phone: '',
    },
    updateToken,
    updateRefreshToken,
  });

  useEffect(() => {
    const ping = async () => {
      let session = getSession();
      if (!session) {
        return;
      }
      try {
        const result = await axios.get(
          `/api/user/ping`, {
          headers: {
            'Authorization': `bearer ${session.token}`
          }
        }
        );
        if (result.status === 200) {
          session.refreshToken = result.data.refreshToken;
          setSession(session);
          return;
        }
      } catch (e) {
        logout();
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
    <div className="au-body">
      <UserContext.Provider value={currentUser}>
        <div className="header-wrapper">
          <Header siteTitle={data.site.siteMetadata.title} />
          <Location>
            {({ navigate, location }) => <MainNav path={location.pathname} />}
          </Location>
        </div>
        <div className="container" style={{ marginTop: '1em', marginBottom: '3em' }}>
            {children}
        </div>
        <div className="center-align">
          This site is part of a 3-month pilot program from March to July 2021
          run by the Digital Squads team at the Digital Transformation Agency.
          <br />
          If you have any questions or feedback, please contact us at{" "}
          <a href="mailto:digitalsquads@dta.gov.au">digitalsquads@dta.gov.au</a>
        </div>
        <div style={{ marginTop: '1em', marginBottom: '3em' }}>
          <Footer path={location.pathname} />
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default DefaultLayout;
