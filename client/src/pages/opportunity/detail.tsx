import { Link } from "gatsby";
import React, { useEffect, useContext } from "react";
import { DateTime } from 'luxon';
import DefaultLayout from "../../components/layouts/default-layout";
import SEO from "../../components/seo";
import { PageContext } from '../../types';
import { useOpportunityHook, useLookupHook } from '../../hooks';
import { UserContext } from '../../context';

const contentOrNA = (c) => {
  return c ? <span style={{ whiteSpace: 'pre-wrap' }}>{c}</span> : "N/A";
}

const DetailedOpportunityView: React.FC<{ opportunityId?: number }> = ({ opportunityId }) => {
  const { loadFn, data } = useOpportunityHook();
  const { getText } = useLookupHook('agency');
  const user = useContext(UserContext);

  useEffect(() => {
    const load = async () => {
      await loadFn(opportunityId);
    }
    load();
  }, [opportunityId]);

  return (
    <>
      {data && (
        <>
          <SEO title={data.jobTitle} />
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/opportunity">Find opportunities</Link>
              </li>
              <li>{contentOrNA(data.jobTitle)}</li>
            </ul>
          </nav>
          <h1>{contentOrNA(data.jobTitle)}</h1>
          <div>
            <div className="row">
              <div
                className="col-md-8"
                style={{ borderRight: "1px solid black", marginTop: "2rem" }}
              >
                <p>
                  <span className="bolden-text">What you'll do</span>
                  <br />
                  {contentOrNA(data.jobDescription)}
                </p>
                <p>
                  <span className="bolden-text">
                    What you'll gain from this experience:
                  </span>
                  <br />
                  {contentOrNA(data.whatYoullGain)}
                </p>
                <p>
                  <span className="bolden-text">About our team</span>
                  <br />
                  {contentOrNA(data.aboutTeam)}
                </p>
                <p>
                  <span className="bolden-text">Relevant skills</span>
                  <br />
                  {contentOrNA(data.skills)}
                </p>
                <p>
                  <span className="bolden-text">
                    Additional information:
                  </span>
                  <br />
                  {contentOrNA(data.additionalInfo)}
                </p>
                <p>
                  <span className="bolden-text">Number of people needed</span>
                  <br />
                  {contentOrNA(data.numberOfPeople)}
                </p>
                <p>
                  <span className="bolden-text">Commitment time</span>
                  <br />
                  {contentOrNA(data.commitmentTime)}
                </p>
                <p>
                  <span className="bolden-text">Location</span>
                  <br />
                  {contentOrNA(data.location)}
                </p>
                <p>
                  <span className="bolden-text">Security clearance needed</span>
                  <br />
                  {contentOrNA(data.securityClearance)}
                </p>
                <p>
                  <span className="bolden-text">Estimated start date</span>
                  <br />
                  {DateTime.fromISO(data.startDate).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}
                </p>
                <p>
                  <span className="bolden-text">Estimated end date</span>
                  <br />
                  {DateTime.fromISO(data.endDate).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}
                </p>
              </div>
              <div className="col-md-4" style={{ marginTop: "2rem" }}>
                {data.numberOfResponses !== undefined && (
                  <p>
                    <span className="bolden-text">Number of responses</span>
                    <br />
                    {data.numberOfResponses}
                  </p>
                )}
                {data.contactPersonName !== undefined && (
                  <p>
                    <span className="bolden-text">Contact person</span>
                    <br />
                    {contentOrNA(data.contactPersonName)}
                  </p>
                )}
                {data.contactPersonEmail !== undefined && (
                  <p>
                    <span className="bolden-text">Contact email</span>
                    <br />
                    {contentOrNA(data.contactPersonEmail)}
                  </p>
                )}
                {data.contactPersonPhone !== undefined && (
                  <p>
                    <span className="bolden-text">Contact phone</span>
                    <br />
                    {contentOrNA(data.contactPersonPhone)}
                  </p>
                )}
                <p>
                  <span className="bolden-text">Department / Agency</span>
                  <br />
                  {contentOrNA(getText(data.agency))}
                </p>
                <div style={{ marginTop: "2rem" }}>
                  {data.canApply || data.canApply === undefined ? (
                    <Link
                      to={`/opportunity-response?opportunityId=${data.id}`}
                      state={{ ...data }}
                      className="au-btn"
                    >
                      Apply for opportunity
                    </Link>
                  ) : (
                    <h4>
                      Applications for this opportunity has ended.
                    </h4>
                  )}
                </div>
                {data.canModify && (
                  <div style={{ marginTop: "2rem" }}>
                    <Link
                      to={`/post-opportunity?opportunityId=${data.id}`}
                      className="au-btn"
                    >
                      Edit opportunity
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

const DetailedOpportunityPage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  const opportunityId = parseInt(params.get('opportunityId'), 10);

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <DetailedOpportunityView opportunityId={opportunityId} />
    </DefaultLayout>
  );
};

export default DetailedOpportunityPage;
