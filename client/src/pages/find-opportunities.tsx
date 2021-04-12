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
        console.log(result.data);
        if (result.status === 200) {
          setOppData(result.data);
        }
      } catch (e) {}
    }
    getData();
  }, []);
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
        {oppData.map((opp) => {
          console.log("Opp", opp);
        })}
        <div className="container-fluid au-body">
          <h1>Find opportunities</h1>
          <div className="row">
            <div className="col-md-2">
              <div style={{ marginTop: "2rem" }}>
                <p>Filter</p>
              </div>
            </div>
            <div className="row">
              <ul
                className="au-card-list au-card-list--matchheight"
                style={{ borderLeft: "1px solid black" }}
              >
                <li className="col-md-4 col-sm-6">
                  <div className="au-card">
                    <div className="au-card__inner">
                      <div className="au-card__title">
                        <h3>
                          Creative video and photo person to follow our pilot
                          and create amazing case studies
                        </h3>
                      </div>
                      <p>Digital Transformation Agency</p>
                      <p>approx 1 day each week</p>
                      <p>01/03/2021</p>
                      <p>03/05/2021</p>
                      <p>Collaboration, Communication, Content Design</p>
                      <p>
                        <Link to="../detailed-opportunity">more</Link>
                      </p>
                    </div>
                  </div>
                </li>
                <li className="col-md-4 col-sm-6">
                  <div className="au-card">
                    <div className="au-card__inner">
                      <div className="au-card__title">
                        <h3>Help us make our new DTA site easy to use</h3>
                      </div>
                      <p>Digital Transformation Agency</p>
                      <p>Negotiable - full time or part time for 4-6 weeks</p>
                      <p>22/02/2021</p>
                      <p>29/03/2021</p>
                      <p>
                        User experience analysis, user experience evaluation,
                        user experience design, user research
                      </p>
                      <p>
                        <Link to="./more">more</Link>
                      </p>
                    </div>
                  </div>
                </li>
                <li className="col-md-4 col-sm-6">
                  <div className="au-card">
                    <div className="au-card__inner">
                      <div className="au-card__title">
                        <h3>
                          User Researcher – work on an impactful opportunity
                          about mobility and digital capability uplift
                        </h3>
                      </div>
                      <p>Digital Transformation Agency</p>
                      <p>3-5 days for the duration requested (happy to chat)</p>
                      <p>01/03/2021</p>
                      <p>26/03/2021</p>
                      <p>
                        User experience analysis, user research, collaboration
                      </p>
                      <p>
                        <Link to="./more">more</Link>
                      </p>
                    </div>
                  </div>
                </li>
                <li className="col-md-4 col-sm-6">
                  <div className="au-card">
                    <div className="au-card__inner">
                      <div className="au-card__title">
                        <h3>Whole of Govt (WoG) Agile Assistance</h3>
                      </div>
                      <p>Digital Transformation Agency</p>
                      <p>2 Hours per week</p>
                      <p>07/03/2021</p>
                      <p>NA</p>
                      <p>
                        Change implementation planning and management, Agile,
                        Agile Lean
                      </p>
                      <p>
                        <Link to="./more">more</Link>
                      </p>
                    </div>
                  </div>
                </li>
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
    </DefaultLayout>
  );
};

export default FindOpportunitiesPage;
