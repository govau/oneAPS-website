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
              <li>What are some examples of opportunities?</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <h1>What are some examples of opportunities?</h1>
          <p>
            There are many types of opportunities you can post, depending on
            what you need or are looking to do, such as:
          </p>
          <ul>
            <li>Get help on projects.</li>
            <li>Propose working groups.</li>
            <li>Get testers for new ideas or products.</li>
            <li>Create a team to work on an idea you have.</li>
            <li>
              Share your expertise or best practices in a particular field.
            </li>
          </ul>
          <p>Here are a few examples of past opportunities:</p>
          <ul>
            <li>
              <a
                href="https://govteams.sharepoint.com/:b:/s/openopportunities/Ebzro6TYP1JBtvTakRKGZYkBG2OKsskaCVW0qPQeKQeubA?e=2vnLWl"
                target="_blank"
              >
                Video production and editing
              </a>
            </li>
            <li>Web design and development</li>
            <li>Content writing</li>
            <li>Data analysis</li>
            <li>Mentorships</li>
            <li>Platform testers</li>
            <li>Subject matter expert presenters</li>
            <li>Event volunteers</li>
          </ul>
          <p>
            Once you are ready to create an opportunity, follow our tips to{" "}
            <a href="write-a-great-opportunity">
              create a successful opportunity
            </a>
            . We encourage you to break up larger projects into multiple,
            smaller projects to reach a wider range of skillsets and make the
            work manageable.
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
