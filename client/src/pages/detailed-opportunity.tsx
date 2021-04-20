import { Link } from "gatsby";
import React, { useEffect } from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from '../types';
import { useOpportunityHook } from '../hooks';


const contentOrNA = (c) => {
  return c ? c : "N/A";
}

const DetailedOpportunityPage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  const opportunityId = parseInt(params.get('opportunityId'), 10);
  const { loadFn, data } = useOpportunityHook();

  useEffect(() => {
    loadFn(opportunityId);
  }, []);

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      {data && (
        <>
          <SEO title="About oneAPS" />
          <div className="container-fluid">
            <nav className="au-breadcrumbs" aria-label="breadcrumb">
              <ul className="au-link-list au-link-list--inline">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/find-opportunities">Find opportunities</Link>
                </li>
                <li>{contentOrNA(data.jobTitle)}</li>
              </ul>
            </nav>
          </div>
          <div className="au-body container-fluid">
            <div className="row">
              <h2>{contentOrNA(data.jobTitle)}</h2>
              <div
                className="col-md-8"
                style={{ borderRight: "1px solid black", marginTop: "2rem" }}
              >
                <p>
                  <span className="bolden-text">What you'll do:</span>
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
                  <span className="bolden-text">About our team:</span>
                  <br />
                  {contentOrNA(data.aboutTeam)}
                </p>
                <p>
                  <span className="bolden-text">Relevant skills:</span>
                  <br />
                  {contentOrNA(data.skills)}
                </p>
                <p>
                  <span className="bolden-text">
                    Additional information (optional):
                </span>
                  <br />
                  {contentOrNA(data.additionalInfo)}
                </p>
                <p>
                  <span className="bolden-text">Number of people needed:</span>
                  <br />
                  {contentOrNA(data.numberOfPeople)}
                </p>
                <p>
                  <span className="bolden-text">Commitment time:</span>
                  <br />
                  {contentOrNA(data.commitmentTime)}
                </p>
                <p>
                  <span className="bolden-text">Location:</span>
                  <br />
                  {contentOrNA(data.location)}
                </p>
                <p>
                  <span className="bolden-text">Security clearance needed:</span>
                  <br />
                  {contentOrNA(data.securityClearance)}
                </p>
                <p>
                  <span className="bolden-text">Estimated start date:</span>
                  <br />
                  {contentOrNA(data.startDate).slice(0, 10)}
                </p>
                <p>
                  <span className="bolden-text">Estimated end date:</span>
                  <br />
                  {contentOrNA(data.endDate).slice(0, 10)}
                </p>
              </div>
              <div className="col-md-4" style={{ marginTop: "2rem" }}>
                <p>
                  <span className="bolden-text">Contact person:</span>
                  <br />
                  {contentOrNA(data.contactPersonName)}
                </p>
                <p>
                  <span className="bolden-text">Contact email:</span>
                  <br />
                  {contentOrNA(data.contactPersonEmail)}
                </p>
                <p>
                  <span className="bolden-text">Contact phone (optional):</span>
                  <br />
                  {contentOrNA(data.contactPersonPhone)}
                </p>
                <p>
                  <span className="bolden-text">Department / Agency:</span>
                  <br />
                  {contentOrNA(data.agency)}
                </p>
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link
                to={`/opportunity-response?opportunityId=${data.id}`}
                state={{ ...data }}
                className="au-btn"
              >
                Apply for opportunity
            </Link>
            </div>
          </div>
          <section className="au-body center-align">
            This site is part of a 3-month pilot program from March to May 2021
            run by the Digital Squads team at the Digital Transformation Agency.
          <br />
          If you have any questions or feedback, please contact us at{" "}
            <a href="mailto:digitalsquads@dta.gov.au">digitalsquads@dta.gov.au</a>
          </section>
        </>
      )}
    </DefaultLayout>
  );
};

export default DetailedOpportunityPage;
