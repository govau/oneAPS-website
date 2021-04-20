import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
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
              <li>About oneAPS</li>
            </ul>
          </nav>
        </div>
        <div className="au-body hero">
          <section className="container-fluid">
            <div className="col-sm-12 col-md-6 col-md-push-6 intro__img">
              <img
                className="au-responsive-media-img"
                src="../../about-oneAPS.png"
                alt="Five people explaining ideas on a board"
              ></img>
            </div>
            <div className="col-sm-12 col-md-6 col-md-pull-6">
              <h1>What oneAPS is</h1>
              <p>
                As part of the Digital Profession, our Digital Squads team are
                trialing a whole-of-government program called oneAPS
                Opportunities. This program aims to assist agencies to come
                together to work on governemnt priorities and uplift digital
                capabilities through digital talent mobility.
              </p>
              <h1>What the program does</h1>
              <p>
                oneAPS Opportunities gives managers access to digital
                professions from across the APS. This will assist with
                short-term flexible work placements, called opporutnities, while
                staying linked to their home teamsagencies. These forms of
                placements are supported in the APS Mobility Framework called
                "Informal Arrangements".
              </p>
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

export default AboutPage;
