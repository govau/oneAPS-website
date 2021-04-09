import * as React from "react";
import PostOpportunityForm from "../components/form/postOpportunity/postOpportunity";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const PostOpportunityPage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Post an Opportunity" />
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <a href="../#">Home</a>
              </li>
              <li>Post an opportunity</li>
            </ul>
          </nav>
        </div>
        <div className="container-fluid au-body">
          <h1>Post an Opportunity</h1>
          <PostOpportunityForm />
        </div>
      </>
    </DefaultLayout>
  );
};

export default PostOpportunityPage;
