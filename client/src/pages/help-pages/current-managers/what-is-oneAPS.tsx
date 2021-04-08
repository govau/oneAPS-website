import * as React from "react";
import DefaultLayout from "../../../components/layouts/default-layout";
import SEO from "../../../components/seo";
import { PageContext } from "../../../types/types";

// markup
const WhatIsOneAPS: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="About oneAPS" />
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <a href="../../#">Home</a>
              </li>
              <li>
                <a href="../../help">Help</a>
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
          <h2>Benefits for APS employees</h2>
          oneAPS is for APS employees looking to gain additional experience. The
          program offers a wide variety of real world projects to work on. By
          participating you can:
          <ul>
            <li>
              Advance your career by sharpening skills, or learning new ones.
            </li>
            <li>
              Break out of your routine - collaborate with other employees
              across different agencies.
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
          oneAPS offers an easy way for agencies, departments and other areas of
          the Australian Government to:
          <ul>
            <li>
              Connect the APS workforce—learn what other areas of the government
              are doing and share best practices.
            </li>
            <li>Gain interagency insights and points of contact. </li>
            <li>
              Tap into the talent and expertise that’s often buried in agency
              silos.
            </li>
            <li>
              Meet their mission, while offering professional development to
              fellow feds.
            </li>
          </ul>
        </div>
      </>
    </DefaultLayout>
  );
};

export default WhatIsOneAPS;
