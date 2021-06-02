import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { MenuItem, MenuItems } from "../../types/types";
import AUmainNav, { AUmainNavContent } from '@gov.au/main-nav';

interface Props {
  path: string;
}

const MainNav: React.FC<Props> = ({ path }) => {
  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            text
            link
          }
        }
      }
    }
  `);
  const user = useContext(UserContext);

  const Links: MenuItems = data.site.siteMetadata.menuLinks;
  let mainNavItems: MenuItems = Links.map((menuItem: MenuItem) => ({
    text: menuItem.text,
    link: menuItem.link,
    active:
      path.length > 1
        ? path.replace(/\/$/, "") === menuItem.link
        : path === menuItem.link,
  }));
  if (user.token) {
    mainNavItems.push({
      text: "My profile",
      link: "/dashboard",
      active:
        path.length > 1
          ? path.replace(/\/$/, "") === "/dashboard"
          : path === "/dashboard",
    });
  } else {
    mainNavItems.push(
      {
        text: "Register",
        link: "/register",
        active:
          path.length > 1
            ? path.replace(/\/$/, "") === "/register"
            : path === "/register",
      },
      {
        text: "Login",
        link: "/login",
        active:
          path.length > 1
            ? path.replace(/\/$/, "") === "/login"
            : path === "/login",
      }
    );
  }

  return (
    <AUmainNav dark className="nav" >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <AUmainNavContent items={mainNavItems} />
          </div>
        </div>
      </div>
    </AUmainNav>
  );
};

export default MainNav;
