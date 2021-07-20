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
              <p>Your opportunity is now open for Commonwealth government employees to apply.</p>
              <p>We encourage you to share it with anyone you think may be interested.</p>
              <h2>Next steps</h2>
              <ul>
                <li><Link to={`/opportunity/detail/?opportunityId=${opportunityId}`}>View</Link> your opportunity</li>
                <li><Link to={`/post-opportunity/?opportunityId=${opportunityId}`}>Edit</Link> your opportunity</li>
                <li><Link to="/post-opportunity">Post</Link> another opportunity</li>
              </ul>
              <p>You will recieve notifications of applications for your opportunity by email.</p>
              <p>How you decide on an applicant is up to you. We encourage you to organise a casual chat to make sure they are a good fit.</p>
              <p>More information about <Link to={"/help-pages/5-matching"}>Matching an applicant</Link>.</p>
              <h2>Share your feedback</h2>
              <p>As this is a pilot, we appreciate your feedback so we can improve our service.</p>
              <p><a href="https://dta.syd1.qualtrics.com/jfe/form/SV_5t2zgcu4m6VHT0O" rel="noopener noreferrer" target="_blank">Complete a 3 minute survey</a>.</p>
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
