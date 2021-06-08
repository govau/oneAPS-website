import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { Link, graphql, useStaticQuery } from "gatsby";
import { AuSideNav } from "../types/auds";

// markup
const Help: React.FC<PageContext> = ({ pageContext, location }) => {

  const data = useStaticQuery(graphql`
      query MyQuery {
        allMarkdownRemark {
          nodes {
            fields {
              slug
              layout
            }
            frontmatter {
              title
            }
            html
          }
        }
      }
  
    `);
  const { allMarkdownRemark } = data;
  const { nodes } = allMarkdownRemark;
  let frontmatter;
  let html;
  let pages = [];

  for (const node of nodes) {
    let active = false;
    if (location.pathname.includes(node.fields.slug) || node.fields.slug.includes(location.pathname)) {
      frontmatter = node.frontmatter;
      html = node.html;
      active = true;
    }
    pages.push({
      link: node.fields.slug,
      text: node.frontmatter.title,
      active
    });
  }
  pages = pages.sort((p1, p2) => {
    if (p1.link < p2.link) {
      return -1;
    }
    if (p1.link > p2.link) {
      return 1;
    }
    return 0;
  });

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Help" />
        <nav className="au-breadcrumbs" aria-label="breadcrumb">
          <ul className="au-link-list au-link-list--inline">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Help</li>
          </ul>
        </nav>
        <div className="au-grid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <AuSideNav linkComponent={i => <Link to={i.to}>{i.children}</Link>}
                accordionHeader="In this section"
                menuHeaderLink="/help-pages/1-about-oneaps/"
                menuHeader="About oneAPS Opportunities"
                items={pages} />
            </div>
            <div className="col-sm-12 col-md-8">
              <h1>{frontmatter.title}</h1><br />
              <div
                className="help-page-content"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default Help;