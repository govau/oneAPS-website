import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { Link, graphql, useStaticQuery } from "gatsby";

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
  for(const node of nodes) {
    if (location.pathname.includes(node.fields.slug) || node.fields.slug.includes(location.pathname)) {
      frontmatter = node.frontmatter;
      html = node.html;
      break;
    }
  }


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
        <h1>{frontmatter.title}</h1>
        <br />
        <section>
          <div
            className="help-page-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
      </>
    </DefaultLayout>
  );
};

export default Help;