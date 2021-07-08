import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const Privacy: React.FC<PageContext> = ({ pageContext, location }) => {

  const data = useStaticQuery(graphql`
      query PrivacyQuery {
        allMarkdownRemark(
          filter: {
            fileAbsolutePath: {
              regex: "/privacy/"
            }
          },
        ) {
          nodes {
            fields {
              slug
              layout
            }
            frontmatter {
              title
            }
            tableOfContents
            html
          }
        }
      }
    `);

  const { allMarkdownRemark } = data;
  const { nodes } = allMarkdownRemark;
  let frontmatter;
  let html;
  let tableOfContents;

  for (const node of nodes) {
    let active = false;

    if (location.pathname.includes(node.fields.slug) || node.fields.slug.includes(location.pathname)) {
      frontmatter = node.frontmatter;
      html = node.html;
      tableOfContents = node.tableOfContents
      active = true;
    }
  }

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title={frontmatter.title} />
        <nav className="au-breadcrumbs" aria-label="breadcrumb">
          <ul className="au-link-list au-link-list--inline">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{frontmatter.title}</li>
          </ul>
        </nav>
        <div className="au-grid" style={{marginTop: '3em'}}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
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

export default Privacy;