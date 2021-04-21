import { Link, navigate } from "gatsby";
import React, { useRef, useEffect } from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types";
import { useOpportunitiesHook } from '../hooks';

const contentOrNA = (c) => {
  return c ? c : "N/A";
}

const OpportunitySummaryView: React.FC<{search?: string}> = ({search}) => {
  const {loadFn, data} = useOpportunitiesHook();
  const searchFieldRef = useRef();

  useEffect(() => {
    loadFn(search);
  }, [search]);

  return (
    <>
      {data && (
        <>
          <SEO title="Find Opportunities" />
          <div className="container-fluid">
            <nav className="au-breadcrumbs" aria-label="breadcrumb">
              <ul className="au-link-list au-link-list--inline">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Find opportunities</li>
              </ul>
            </nav>
          </div>

          <div className="container-fluid au-body">
            <h1>Find opportunities</h1>
            <div className="row">
              <div className="col-md-2">
              <div style={{ marginTop: "2rem" }}>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (searchFieldRef) {
                    navigate(`/find-opportunities/?search=${encodeURIComponent(searchFieldRef.current.value)}`);
                  }
                }}>
                  <label htmlFor="search">Search</label>
                  <input className="au-text-input au-text-input--block" ref={searchFieldRef} id="search" type="text" defaultValue={search} />
                  <button type="submit" style={{ marginTop: '1em'}} className="au-btn">
                    Search
                  </button>
                </form>
              </div>
            </div>
            <div className="row">
              <ul className="au-card-list au-card-list--matchheight">
                {/*style={{ borderLeft: "1px solid black" }}*/}
                {data.map((opp, key) => {
                  return (
                    <li className="col-md-4 col-sm-6" key={key}>
                      <div className="au-card">
                        <div className="au-card__inner">
                          <div className="au-card__title">
                            <h3>
                              <br />
                              {contentOrNA(opp.jobTitle)}
                            </h3>
                          </div>
                          <p>
                            <span className="desc-text">Agency/Department</span>
                            <br />
                            {contentOrNA(opp.agency)}
                          </p>
                          <p>
                            <span className="desc-text">Commitment Time</span>
                            <br />
                            {contentOrNA(opp.commitmentTime)}
                          </p>
                          <p>
                            <span className="desc-text">Start date</span>
                            <br />
                            {contentOrNA(opp.startDate).slice(0, 10)}
                          </p>
                          <p>
                            <span className="desc-text">End date</span>
                            <br />
                            {contentOrNA(opp.endDate).slice(0, 10)}
                          </p>
                          <p>
                            <span className="desc-text">Required skills</span>
                            <br />
                            {contentOrNA(opp.skills)}
                          </p>
                          {opp.numberOfResponses !== undefined && (
                            <p>
                              <span className="desc-text">Number of responses</span>
                              <br />
                              {opp.numberOfResponses }
                            </p>
                          )}
                          <p>
                            <Link to={`/detailed-opportunity/?opportunityId=${opp.id}`}>
                              more
                          </Link>
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
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
    </>
  );
};

const FindOpportunitiesPage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const params = new URLSearchParams(location.search);
  let search: string;
  if (params.get('search')) {
    search = params.get('search');
  }
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <OpportunitySummaryView search={search}/>
    </DefaultLayout>
  );
};

export default FindOpportunitiesPage;
