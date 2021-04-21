import React, { useEffect } from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { Link } from "gatsby";
import { useOpportunityHook } from '../hooks';

// markup
const SuccessfullyPosted: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const { loadFn, data } = useOpportunityHook();
  const params = new URLSearchParams(location.search);
  const opportunityId = parseInt(params.get('opportunityId'), 10);

  useEffect(() => {
    loadFn(opportunityId);
  }, [opportunityId])

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      {data && (
        <>
          <SEO title="Register" />
          <div className="container-fluid au-body">
            <h1>Your opportunity is now live</h1>
            <p>Your next steps</p>
            <ul>
              <li><Link to={`/detailed-opportunity/?opportunityId=${opportunityId}`}>View</Link> your opportunity</li>
              <li><Link to={`/post-opportunity/?opportunityId=${opportunityId}&title=${encodeURI(data.jobTitle)}`}>Edit</Link> your opportunity</li>
              <li><Link to="/post-opportunity">Post</Link> another opportunity</li>
            </ul>
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default SuccessfullyPosted;
