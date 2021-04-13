import axios from "axios";
import { Link } from "gatsby";
import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { IOpportunityType, PageContext } from "../types/types";
// markup
const DetailedOpportunityPage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  const [oppData, setOppData] = React.useState<IOpportunityType[]>([]);
  React.useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get("/api/Opportunity/" + location.state.id);
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
        <SEO title="About oneAPS" />
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <a href="../#">Home</a>
              </li>
              <li>
                <a href="../find-opportunities">Find opportunities</a>
              </li>
              <li>{contentOrNA(oppData.jobTitle)}</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <div className="row">
            <h2>{contentOrNA(oppData.jobTitle)}</h2>
            <div
              className="col-md-8"
              style={{ borderRight: "1px solid black", marginTop: "2rem" }}
            >
              <p>
                <span className="bolden-text">What you'll do:</span>
                <br />
                {contentOrNA(oppData.jobDescription)}
              </p>
              <p>
                <span className="bolden-text">
                  What you'll gain from this experience:
                </span>
                <br />
                {contentOrNA(oppData.whatYoullGain)}
              </p>
              <p>
                <span className="bolden-text">About our team:</span>
                <br />
                {contentOrNA(oppData.aboutTeam)}
              </p>
              <p>
                <span className="bolden-text">Relevant skills:</span>
                <br />
                {contentOrNA(oppData.skills)}
              </p>
              <p>
                <span className="bolden-text">
                  Additional information (optional):
                </span>
                <br />
                {contentOrNA(oppData.additionalInfo)}
              </p>
              <p>
                <span className="bolden-text">Number of people needed:</span>
                <br />
                {contentOrNA(oppData.numberOfPeople)}
              </p>
              <p>
                <span className="bolden-text">Commitment time:</span>
                <br />
                {contentOrNA(oppData.commitmentTime)}
              </p>
              <p>
                <span className="bolden-text">Location:</span>
                <br />
                {contentOrNA(oppData.location)}
              </p>
              <p>
                <span className="bolden-text">Security clearance needed:</span>
                <br />
                {contentOrNA(oppData.securityClearance)}
              </p>
              <p>
                <span className="bolden-text">Estimated start date:</span>
                <br />
                {contentOrNA(oppData.startDate)}
              </p>
              <p>
                <span className="bolden-text">Estimated end date:</span>
                <br />
                {contentOrNA(oppData.endDate)}
              </p>
            </div>
            <div className="col-md-4" style={{ marginTop: "2rem" }}>
              <p>
                <span className="bolden-text">Contact person:</span>
                <br />
                {contentOrNA(oppData.contactPersonName)}
              </p>
              <p>
                <span className="bolden-text">Contact email:</span>
                <br />
                {contentOrNA(oppData.contactPersonEmail)}
              </p>
              <p>
                <span className="bolden-text">Contact phone (optional):</span>
                <br />
                {contentOrNA(oppData.contactPersonPhone)}
              </p>
              <p>
                <span className="bolden-text">Department / Agency:</span>
                <br />
                {contentOrNA(oppData.agency)}
              </p>
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Link
              to={`/opportunity-response?opportunity=${oppData.id}`}
              state={{...oppData}}
              className="au-btn">
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
    </DefaultLayout>
  );
};

export default DetailedOpportunityPage;
