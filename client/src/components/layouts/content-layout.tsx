import React from "react";
import { graphql } from "gatsby";
import DefaultLayout from "./default-layout";
import SEO from "../seo";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  location: any;
  data: any;
  pageContext: any;
}

const PageLayout: React.FC<Props> = ({ pageContext, location, data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title={frontmatter.title} description={frontmatter.metaDesc} />
        <div
          className="container-fluid au-body"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </>
    </DefaultLayout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        metaDesc
      }
    }
  }
`;

export default PageLayout;
