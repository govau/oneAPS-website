import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Nav } from "../../types/auds";
import { MenuItem, MenuItems } from "../../types/types";

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
    <Nav dark>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div id="main-nav-default" className="au-main-nav__content">
              <div className="au-main-nav__menu">
                <div className="au-main-nav__menu-inner">
                  
                  <ul className="au-link-list">
                    {mainNavItems.map(i => {
                      return (
                        <li key={i.text} className={i.active ? 'active': ''}>
                          <Link to={i.link}>{i.text}</Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="au-main-nav__focus-trap-bottom"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default MainNav;
