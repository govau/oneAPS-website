import * as React from "react";
import DefaultLayout from "../../../components/layouts/default-layout";
import SEO from "../../../components/seo";
import { PageContext } from "../../../types/types";

// markup
const AboutPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="About oneAPS" />
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <a href="../../../#">Home</a>
              </li>
              <li>
                <a href="../../help">Help</a>
              </li>
              <li>Using mobility as a manager</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <h1>Using mobility as a manager</h1>
          <p>
            As highlighted in the{" "}
            <a
              href="https://legacy.apsc.gov.au/advancing-professional-development-through-planned-mobility"
              target="_blank"
            >
              APS Mobility Framework
            </a>
            , mobility can help you achieve your strategic goals as a manager.
            Using and supporting temporary moves into and out of your team can
            help you:
            <ul>
              <li>manage surges and peaks in workload for your team</li>
              <li>bring in expertise to solve complex problems</li>
              <li>build the capabilities of your team</li>
              <li>
                foster collaboration between your team and your stakeholders
              </li>
              <li>
                Deliver on government, organisation and business priorities.
              </li>
            </ul>
          </p>
          <h2>Benefits for agencies and managers</h2>
          <p>
            oneAPS offers an easy way for agencies, departments and other areas
            of the Australian Government to:
          </p>
          <ul>
            <li>
              Connect the APS workforce—learn what other areas of the government
              are doing and share best practices.
            </li>
            <li>Gain interagency insights and points of contact.</li>
            <li>
              Tap into the talent and expertise that’s often buried in agency
              silos.
            </li>
            <li>
              Meet their mission, while offering professional development to
              fellow APS staff.
            </li>
          </ul>
          <h2>
            Collaboration and knowledge sharing across the Australian Government
          </h2>
          <p>
            Opportunities offer an easy way for agencies, departments and other
            areas of the Australian Government to:
          </p>
          <ul>
            <li>
              Meet their mission, while offering professional development to
              fellow APS staff.
            </li>
            <li>
              Learn what other areas of the government are doing and share best
              practices.
            </li>
          </ul>
          <h2>Identifying opportunities</h2>
          <p>
            In many cases your employee will find their own opportunity, or a
            role will be advertised that will be suitable. However, you can also
            help an employee find a good professional development opportunity.
          </p>
          <p>
            oneAPS is a great way to find opportunities which can help your
            staff build digital experience and skills. Its also a useful tool to
            help you find needed digital capabilities when they are needed.
          </p>
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

export default AboutPage;
