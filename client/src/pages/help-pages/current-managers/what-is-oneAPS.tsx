import * as React from "react";
import DefaultLayout from "../../../components/layouts/default-layout";
import SEO from "../../../components/seo";
import { PageContext } from "../../../types/types";
import { Link } from "gatsby";

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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
              <li>What is oneAPS?</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <h1>What is oneAPS?</h1>
          <p>
            oneAPS is a government wide{" "}
            <span className="bolden-text">Digital Professions</span> pilot
            program offering professional development opportunities to current
            Australian Public Service (APS) employees. The program facilitates
            collaboration and knowledge sharing across the Australian
            Government.
          </p>
          <h1>Benefits for APS employees</h1>
          <p>
            oneAPS is for APS employees looking to gain additional experience.
            The program offers a wide variety of real world projects to work on.
          </p>
          <p>By participating you can:</p>
          <ul>
            <li>
              Advance your career by sharpening skills, or learning new ones.
            </li>
            <li>Make new contacts and join a community of innovators.</li>
            <li>
              Work remotely or in-person - in fact 99.9% can be done remotely,
              so there are no travel costs (some internships are in-person
              only).
            </li>
            <li>
              Choose from a wide range of projects across the government - some
              may take as little as 1-2 hours, while others may take 20% time
              over several months.
            </li>
          </ul>
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
              fellow feds.
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
              fellow feds.
            </li>
            <li>
              Learn what other areas of the government are doing and share best
              practices.
            </li>
          </ul>
          <h2>How does it work?</h2>
          <p>There are two ways you can participate.</p>
          <p className="bolden-text">Post an opportunity</p>
          <p>
            You can create and post opportunities. Get help on projects, propose
            working groups, get testers for new ideas or products or create a
            team to work on an idea you have.{" "}
            <Link to="/help-pages/opportunity-creators/write-a-great-opportunity">
              See how you can create an opportunity.
            </Link>
          </p>
          <h2>Work on an opportunity</h2>
          <p>
            You can apply to and work on opportunities that sound interesting.
            Choose from a wide range of projects and discover something new.
          </p>
          <p>
            <Link to="/find-opportunities">
              Check out available opportunities.
            </Link>
          </p>
          <h2>Can federal contractors participate?</h2>
          <p>
            Some federal contractors can post opportunities on behalf of their
            federal manager, but they can't apply to or work on an opportunity.
          </p>
          <h2>​​​​​​​Does it cost anything?</h2>
          <p>
            No. oneAPS is a free tool and open to all APS employees to use as
            is.
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
