import axios from "axios";
import { Link } from "gatsby";
import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { IOpportunityType, PageContext } from "../types/types";

// markup
const FindOpportunitiesPage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const [oppData, setOppData] = React.useState<IOpportunityType[]>([]);
  React.useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get("/api/Opportunity");
        if (result.status === 200) {
          setOppData(result.data);
        }
      } catch (e) {}
    }
    getData();
  }, []);

  function contentOrNA(c) {
    return c ? c : "N/A";
  }

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Find Opportunities" />
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <a href="../#">Home</a>
              </li>
              <li>Find opportunities</li>
            </ul>
          </nav>
        </div>

        <div className="container-fluid au-body">
          <h1>Find opportunities</h1>
          <div className="row">
            {/* <div className="col-md-2">           //Filter placeholder
              <div style={{ marginTop: "2rem" }}>
                <p>Filter</p>
              </div>
            </div>
            <div className="row">*/}
            <ul className="au-card-list au-card-list--matchheight">
              {/*style={{ borderLeft: "1px solid black" }}*/}
              {oppData.map((opp, key) => {
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
                          <span className="desc-text">Agency/Department:</span>
                          <br />
                          {contentOrNA(opp.agency)}
                        </p>
                        <p>
                          <span className="desc-text">Commitment Time:</span>
                          <br />
                          {contentOrNA(opp.commitmentTime)}
                        </p>
                        <p>
                          <span className="desc-text">Start date:</span>
                          <br />
                          {contentOrNA(opp.startDate).slice(0, 10)}
                        </p>
                        <p>
                          <span className="desc-text">End date:</span>
                          <br />
                          {contentOrNA(opp.endDate).slice(0, 10)}
                        </p>
                        <p>
                          <span className="desc-text">Required skills:</span>
                          <br />
                          {contentOrNA(opp.skills)}
                        </p>
                        <p>
                          <Link
                            to="../detailed-opportunity"
                            state={{ id: opp.id }}
                          >
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
        {/*</div>*/}
        <section className="au-body center-align">
          This site is part of a 3-month pilot program from March to May 2021
          run by the Digital Squads team at the Digital Transformation Agency.
          <br />
          If you have any questions or feedback, please contact us at{" "}
          <a href="mailto:digitalsquads@dta.gov.au">digitalsquads@dta.gov.au</a>
        </section>
      </>
    </DefaultLayout>
  );
};

export default FindOpportunitiesPage;
