import { Link } from "gatsby";
import React, { useContext, useEffect } from "react";
import { DateTime } from 'luxon';
import { useOpportunityResponseHook } from '../../hooks';
import { Aubtn } from "../../types/auds";

const contentOrNA = (c) => {
  return c ? <span style={{ whiteSpace: 'pre-wrap' }}>{c}</span> : "N/A";
}

export const MyResponse: React.FC<{ opportunityResponseId: number }> = ({ opportunityResponseId }) => {
  const { loadResponseFn, updatedData, downloadFileFn } = useOpportunityResponseHook();

  useEffect(() => {
    loadResponseFn(opportunityResponseId);
  }, []);

  return (
    <>
      <nav className="au-breadcrumbs" aria-label="breadcrumb">
        <ul className="au-link-list au-link-list--inline">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">My profile</Link>
          </li>
          <li>
            My application
          </li>
        </ul>
      </nav>
      <h1>My application</h1>
      <div style={{ marginTop: '3em' }}>
        {updatedData && (
          <div className="row">
            <div className="col-md-12">
              <p>
                <span className="bolden-text">Opportunity</span>
                <br />
                <Link to={`/opportunity/detail/?opportunityId=${updatedData.opportunityId}`}>{contentOrNA(updatedData.opportunity.jobTitle)}</Link>
              </p>
              <p>
                <span className="bolden-text">Why me? (Your pitch)</span>
                <br />
                {contentOrNA(updatedData.whyPickMe)}
              </p>
              <p>
                <span className="bolden-text">LinkedIn Profile URL</span>
                <br />
                {updatedData.resumeLink ? <a href={updatedData.resumeLink}>{updatedData.resumeLink}</a> : "N/A"}
              </p>
              <p>
                <span className="bolden-text">Resume</span>
                <br />
                {updatedData.resumeUpload ?
                  <a href="" onClick={async (e) => {
                    e.preventDefault();
                    var response = await downloadFileFn(updatedData.id, updatedData.resumeUpload);
                    const url = window.URL.createObjectURL(response);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', updatedData.resumeUpload);
                    document.body.appendChild(link);
                    link.click();
                  }}>{updatedData.resumeUpload}</a>
                  : "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
