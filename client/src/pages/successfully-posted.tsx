import React, { useEffect } from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { Link } from "gatsby";
import { useOpportunityHook } from '../hooks';

const View: React.FC<{opportunityId: number}> = ({ opportunityId }) => {
  const { loadFn, data } = useOpportunityHook();

  useEffect(() => {
    loadFn(opportunityId);
  }, [opportunityId]);

  return (
    <>
      {data && (
        <>
          {data.publishedAt && (
            <>
              <h1>Your opportunity is now live</h1>
              <p>Your next steps</p>
              <ul>
                <li><Link to={`/opportunity/detail/?opportunityId=${opportunityId}`}>View</Link> your opportunity</li>
                <li><Link to={`/post-opportunity/?opportunityId=${opportunityId}`}>Edit</Link> your opportunity</li>
                <li><Link to="/post-opportunity">Post</Link> another opportunity</li>
              </ul>
            </>
          )}
          {!data.publishedAt && (
            <>
              <h1>Your opportunity is saved</h1>
              <p>Your next steps</p>
              <ul>
                <li><Link to={`/opportunity/detail/?opportunityId=${opportunityId}`}>View</Link> your opportunity</li>
                <li><Link to={`/post-opportunity/?opportunityId=${opportunityId}`}>Post or edit</Link> your opportunity</li>
                <li><Link to="/post-opportunity">Post</Link> another opportunity</li>
              </ul>
            </>
          )}
        </>
      )}
    </>
  )
}

// markup
const SuccessfullyPosted: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  const opportunityId = parseInt(params.get('opportunityId'), 10);


  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Successfully created opportunity" />
        <View opportunityId={opportunityId} />
      </>
    </DefaultLayout>
  );
};

export default SuccessfullyPosted;
