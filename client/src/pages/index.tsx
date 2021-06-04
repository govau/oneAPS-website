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
                <h2>A digital profession pilot program</h2>
                <p>
                  This site is part of a pilot program run by the Digital Professions at the Digital Transformation Agency.
                </p>
                <p>If you have any questions or feedback, please contact us at <a href="mailto:digitalsquads@dta.gov.au">digitalsquads@dta.gov.au</a></p>
              </>
            </PageAlert>
          </section>
          <section className="container">
            <div className="col-sm-12 col-md-6 col-md-push-6 intro__img">
              <img
                className="au-responsive-media-img"
                src="../../homepage-workingtogether.png"
                alt="Four people holding a sign that says 'working together as one APS'"
              ></img>
            </div>
            <div className="intro__text col-sm-12 col-md-6 col-md-pull-6">
              <h2>
                A place to find flexible work opportunities across the APS to
                help deliver outcomes for government and the citizens we all
                serve.
              </h2>
              <br />
              <p>
                <p className="bolden-text">Want to post an opportunity?</p>
                Anyone can post an opportunity on oneAPS.
              </p>
              <p>
                For more details on how to publish an opportunity see the help
                guide.
              </p>
              <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <Link to="post-opportunity" className="au-btn">
                  Post an opportunity
                </Link>
              </div>
              <div>
                Want to find out more or have feedback? Contact{" "}
                <a href="mailto:digitalsquads@dta.gov.au">
                  digitalsquads@dta.gov.au
                </a>
              </div>
            </div>
          </section>
        </div>
        <section className="au-body" style={{ background: "#EBEBEB", marginTop: '2em', paddingTop: '2em', paddingBottom: '2em' }}>
          <div className="container">
            <div className="row">
              <div
                className="col-md-12 center-align"
                style={{ marginBottom: "2rem" }}
              >
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
                <p>Use your talent on short term<br/>opportunities that are meaningful to you.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    </DefaultLayout>
  );
};

export default IndexPage;
