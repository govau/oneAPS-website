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
        <SEO title="Post opporunity" />
        <div className="container-fluid au-body">
          <h1>Post Opportunity</h1>
          <PostOpportunityForm />
        </div>
      </>
    </DefaultLayout>
  );
};

export default PostOpportunityPage;
