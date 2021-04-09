import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const HelpPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Help" />
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <a href="../#">Home</a>
              </li>
              <li>Help</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <section>
            <h1>Help & FAQs</h1>
          </section>
          <section>
            <div className="row">
              <div className="col-md-4">
                <div className="center-align">
                  <h2>Opportunity creators</h2>
                  <img
                    src="../../opportunity-creators.png"
                    alt="opportunity creators"
                    style={{ width: "10rem" }}
                  ></img>
                </div>
                <ul>
                  <li>
                    <a href="/help-pages/opportunity-creators/write-a-great-opportunity">
                      How to write a great opportunity
                    </a>
                  </li>
                  <li>
                    <a href="./help-pages/opportunity-creators/how-long-to-post-opportunity-and-review">
                      How long does it take to post an opportunity and review
                      applicants?
                    </a>
                  </li>
                  <li>
                    <a href="./help-pages/opportunity-creators/creating-new-opportunity">
                      Creating a new opportunity
                    </a>
                  </li>
                  <li>
                    <a href="./help-pages/opportunity-creators/onboarding-for-host-managers">
                      Guide to onboarding for host managers
                    </a>
                  </li>
                  <li>
                    <a href="./help-pages/opportunity-creators/examples-of-opportunities">
                      What are some examples of opportunities?
                    </a>
                  </li>
                  <li>
                    <a href="../#">Example opportunity</a> (external)
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <div className="center-align">
                  <h2>Digital professionals</h2>
                  <img
                    src="../../digital-professionals.png"
                    alt="digital-professionals"
                    style={{ width: "10rem" }}
                  ></img>
                </div>
                <ul>
                  <li>
                    <a href="./help-pages/digital-professions/how-to-apply-to-opportunity">
                      How to apply to an opportunity
                    </a>
                  </li>
                  <li>
                    <a href="./help-pages/digital-professions/who-can-participate">
                      Who can participate?
                    </a>
                  </li>
                  <li>
                    <a href="./help-pages/opportunity-creators/can-work-count-as-training">
                      Can my work count as training?
                    </a>
                  </li>
                  <li>
                    <a href="./help-pages/opportunity-creators/recognition-for-participating-in-opportunity">
                      Do I get recognition for participating in an opportunity?
                    </a>
                  </li>
                  <li>
                    <a href="./help-pages/opportunity-creators/writing-personal-pitch">
                      Writing a personal pitch
                    </a>
                  </li>
                  <li>
                    <a href="./help-pages/opportunity-creators/how-to-withdraw-application">
                      How to withdraw an application
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <div className="center-align">
                  <h2>Current managers</h2>
                  <img
                    src="../../current-managers.png"
                    alt="current managers"
                    style={{ width: "10rem" }}
                  ></img>
                </div>
                <ul>
                  <li>
                    <a href="./help-pages/current-managers/what-is-oneAPS">
                      What is oneAPS?
                    </a>
                  </li>
                  <li>
                    <a href="./help-pages/digital-professions/using-mobility-as-manager">
                      Using mobility as a manager
                    </a>
                  </li>
                  <li>
                    <a href="https://www.apsc.gov.au/advancing-professional-development-through-planned-mobility">
                      Advancing professional development through planned
                      mobility
                    </a>{" "}
                    (external)
                  </li>
                </ul>
              </div>
            </div>
          </section>
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

export default HelpPage;
