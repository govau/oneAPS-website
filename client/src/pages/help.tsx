import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { Link } from "gatsby";

// markup
const HelpPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Help" />
        <nav className="au-breadcrumbs" aria-label="breadcrumb">
          <ul className="au-link-list au-link-list--inline">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Help</li>
          </ul>
        </nav>
        <h1>Help {'&'} FAQs</h1>
        <br />
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
                  <Link to="/help-pages/opportunity-creators/write-a-great-opportunity">
                    How to write a great opportunity
                    </Link>
                </li>
                <li>
                  <Link to="/help-pages/opportunity-creators/how-long-to-post-opportunity-and-review">
                    How long does it take to post an opportunity and review
                    applicants?
                    </Link>
                </li>
                <li>
                  <Link to="/help-pages/opportunity-creators/creating-new-opportunity">
                    Creating a new opportunity
                    </Link>
                </li>
                <li>
                  <Link to="/help-pages/opportunity-creators/onboarding-for-host-managers">
                    Guide to onboarding for host managers
                    </Link>
                </li>
                <li>
                  <Link to="/help-pages/opportunity-creators/examples-of-opportunities">
                    What are some examples of opportunities?
                    </Link>
                </li>
                <li>
                  <a
                    href="/example-opportunity.pdf"
                    target="_blank"
                  >
                    Example opportunity
                    </a>{" "}
                    (external)
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
                  <Link to="/help-pages/digital-professionals/how-to-apply-to-opportunity">
                    How to apply to an opportunity
                    </Link>
                </li>
                <li>
                  <Link to="/help-pages/digital-professionals/who-can-participate">
                    Who can participate?
                    </Link>
                </li>
                <li>
                  <Link to="/help-pages/digital-professionals/can-work-count-as-training">
                    Can my work count as training?
                    </Link>
                </li>
                <li>
                  <Link to="/help-pages/digital-professionals/recognition-for-participating-in-opportunity">
                    Do I get recognition for participating in an opportunity?
                    </Link>
                </li>
                <li>
                  <Link to="/help-pages/digital-professionals/writing-personal-pitch">
                    Writing a personal pitch
                    </Link>
                </li>
                <li>
                  <Link to="/help-pages/digital-professionals/how-to-withdraw-application">
                    How to withdraw an application
                    </Link>
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
                  <Link to="/help-pages/current-managers/what-is-oneAPS">
                    What is oneAPS?
                    </Link>
                </li>
                <li>
                  <Link to="/help-pages/current-managers/using-mobility-as-manager">
                    Using mobility as a manager
                    </Link>
                </li>
                <li>
                  <a
                    href="https://legacy.apsc.gov.au/advancing-professional-development-through-planned-mobility"
                    target="_blank"
                  >
                    Advancing professional development through planned
                    mobility
                    </a>{" "}
                    (external)
                  </li>
              </ul>
            </div>
          </div>
        </section>
      </>
    </DefaultLayout>
  );
};

export default HelpPage;
