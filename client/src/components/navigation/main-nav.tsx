import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { MenuItems, MenuItem } from "../../types/types";
import { Nav, NavContent } from "../../types/auds";

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

  const Links: MenuItems = data.site.siteMetadata.menuLinks;
  const mainNavItems: MenuItems = Links.map((menuItem: MenuItem) => ({
    text: menuItem.text,
    link: menuItem.link,
    active:
      path.length > 1
        ? path.replace(/\/$/, "") === menuItem.link
        : path === menuItem.link,
  }));

  return (
    <Nav dark>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <NavContent items={mainNavItems} />
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default MainNav;
