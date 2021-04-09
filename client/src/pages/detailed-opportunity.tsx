import { Link } from "gatsby";
import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const DetailedOpportunityPage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
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
              <li>
                Creative video and photo person to follow our pilot and create
                amazing case studies
              </li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <div className="row">
            <h2>
              Creative video and photo person to follow our pilot and create
              amazing case studies
            </h2>
            <div
              className="col-md-8"
              style={{ borderRight: "1px solid black", marginTop: "2rem" }}
            >
              <p>
                <span className="bolden-text">What you'll do:</span>
                <br />
                We need a storyteller to help create case studies for the OneAPS
                pilot. OneAPS is testing short-term opportunities to promote
                mobility and capability uplift in the APS. Working with our user
                researcher, you will capture images and video of people working
                on opportunities across various government agencies. You will
                then create case studies which will form a library to show how
                OneAPS opportunities work. You will need your own camera and
                access to editing software. The ability to travel around
                Canberra would be good. We don't necessarily require a
                communications specialist - we need someone who can tell a story
                well and communicate in a creative way. We would be very happy
                to discuss this opportunity with you if you'd like to bounce
                ideas of how it could work.
              </p>
              <p>
                <span className="bolden-text">
                  What you'll gain from this experience:
                </span>
                <br />
                From this opportunity you may learn about:
                <ul className="no-space">
                  <li>Design thinking</li>
                  <li>Research interviews</li>
                  <li>Connections at the DTA</li>
                  <li>How OneAPS works</li>
                  <li>What the Digital Profession is about</li>
                </ul>
              </p>
              <p>
                <span className="bolden-text">About our team:</span>
                <br />
                OneAPS is a pilot of short-term mobility opportunities. It is
                closely linked to the Digital Profession. OneAPS is developed by
                the Digital Squads team in the Digital Transformation Agency.
              </p>
              <p>
                <span className="bolden-text">Relevant skills:</span>
                <br />
                <ul className="no-space">
                  <li>Collaboration</li>
                  <li>Communication</li>
                  <li>Content Design</li>
                </ul>
              </p>
              <p>
                <span className="bolden-text">
                  Additional information (optional):
                </span>
                <br />
                Days may vary depending on bookings with people participating in
                OneAPS opportunities. This would involve a bit of travel as you
                will need to visit with the participants in their workplaces to
                shoot video and photos as well as write stories.
              </p>
              <p>
                <span className="bolden-text">Number of people needed:</span>
                <br />1
              </p>
              <p>
                <span className="bolden-text">Commitment time:</span>
                <br />
                approx 1 day each week
              </p>
              <p>
                <span className="bolden-text">Location:</span>
                <br />
                Virtual; Canberra
              </p>
              <p>
                <span className="bolden-text">Security clearance needed:</span>
                <br />
                Baseline
              </p>
              <p>
                <span className="bolden-text">Estimated start date:</span>
                <br />
                01/03/2021
              </p>
              <p>
                <span className="bolden-text">Estimated end date:</span>
                <br />
                03/05/2021
              </p>
            </div>
            <div className="col-md-4" style={{ marginTop: "2rem" }}>
              <p>
                <span className="bolden-text">Contact person:</span>
                <br />
                Belle Hogg
              </p>
              <p>
                <span className="bolden-text">Contact email:</span>
                <br />
                digitalsquads@dta.gov.au
              </p>
              <p>
                <span className="bolden-text">Contact phone (optional):</span>
                <br />
                N/A
              </p>
              <p>
                <span className="bolden-text">Department / Agency:</span>
                <br />
                Digital Transformation Agency
              </p>
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Link to="apply" className="au-btn">
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
