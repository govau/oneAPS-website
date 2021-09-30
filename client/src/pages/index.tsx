import { Link } from "gatsby";
import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import PageAlert from "../components/blocks/pageAlert";
import SEO from "../components/seo";
import "../sass/main.scss";
import { PageContext } from "../types/types";

// markup
const IndexPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Home" />
        <div className="au-body hero">
          <section className="container" style={{ marginBottom: '3em' }}>
            <PageAlert type="info">
              <>
                <h2>We've moved to the Digital Profession</h2>
                <p>From 1 October, <a href="https://digitalprofession.gov.au/join-digital-profession" rel="noreferrer noopener">join the Digital Profession</a> as a Practitioner to post and find short-term mobility opportunities across government.</p>
                <p>We're still working on finding the best short-term mobility solution for the APS. This new phase of short-term mobility opportunities is another way for us to learn what our users need.</p>
                <p>We're excited to test the next phase of the short-term mobility opportunities and we welcome your feedback:</p>
                <p><a href="https://apscommission.syd1.qualtrics.com/jfe/form/SV_eM8ATOa6Vfq1OCy" rel="noopener noreferrer" target="_blank">Complete 3 minute survey</a></p>
                <p>If you have any questions or feedback, contact us at <a href="mailto:specialist.advice@apsc.gov.au">specialist.advice@apsc.gov.au</a>.</p>
              </>
            </PageAlert>
          </section>
          <section className="container">
            <div className="col-sm-12 col-md-6 col-md-push-6 intro__img">
              <img
                className="au-responsive-media-img"
                src="../../one-aps-move.jpeg"
                alt="A truck carrying a billboard of six happy people standing under text that says 'oneAPS opportunities' moving in the same direction as the 'Digital Profession members community' street sign."
              ></img>
            </div>
            <div className="intro__text col-sm-12 col-md-6 col-md-pull-6">
              <h2>
                A place to find flexible work opportunities across the Australian Federal Government to
                help deliver outcomes for the citizens we all serve.
              </h2>
              <br />
              <p>Want to get involved?</p>
              <p>
                All Federal Government employees can participate.
              </p>
              <p className="bolden-text">
                You can choose to post an opportunity or apply for an opportunity.
              </p>
              <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                Check out our <a target="_blank" href="https://www.digitalprofession.gov.au/blog/using-oneaps-uplift-team-skills-and-knowledge" rel="noopener">blog post</a> for a story of an opportunity in action.
              </div>
              {/* <div>
                <Link to="/opportunity" className="au-btn">Find opportunities</Link>
              </div> */}
            </div>
          </section>
        </div>
        <section className="au-body" style={{ background: "#EBEBEB", marginTop: '2em', paddingTop: '2em', paddingBottom: '2em' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 center-align" style={{ marginBottom: "2rem" }}>
                <h1>Why would you apply for an opportunity?</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 center-align">
                <img src="../../make-connections.png"></img>
                <p className="bolden-text">Make connections</p>
                <p>Your new colleagues may be down the hall or across the country</p>
              </div>
              <div className="col-md-4 center-align">
                <img src="../../build-skills.png"></img>
                <p className="bolden-text">Build skills</p>
                <p>Advance your career by developing new skills and experience</p>
              </div>
              <div className="col-md-4 center-align">
                <img src="../../make-difference.png"></img>
                <p className="bolden-text">Make a difference</p>
                <p>Use your talent on short term<br />opportunities that are meaningful to you.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    </DefaultLayout>
  );
};

export default IndexPage;
