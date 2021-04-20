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
              <li>Writing a personal pitch</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <h1>Writing a personal pitch</h1>
          <p>
            Your pitch is a chance to tell the agency why you are the right
            person for the opportunity. It should clearly say{" "}
            <span className="bolden-text">who you are</span>,{" "}
            <span className="bolden-text">what your offer is</span> and{" "}
            <span className="bolden-text">what you’d like to gain</span> from
            doing this opportunity.
          </p>
          <p>Getting started:</p>
          <h2>1. Who you are</h2>
          <p>
            Open with a little bit about yourself such as your current role,
            special skills and experience, followed with a brief overview of
            current responsibilities.
          </p>
          <h2>2. What you offer to this opportunity</h2>
          <p>
            Clearly show the value you want to bring to this opportunity. This
            is where you talk about how your skills, experience and attributes
            are relevant for the opportunity.
          </p>
          <p>
            <span className="bolden-text">Tip:</span>make a list of all things
            you’re awesome at, the things people love you for, and the things
            you’re proud of. Once you’ve got all your awesomeness down in one
            place, pick out the pieces that feel the most relevant to the
            opportunity you’re applying for. ​​​​​​​
          </p>
          <p>
            <span className="bolden-text">Note:</span> If you are less
            experienced in the digital skill asked for, talk about your interest
            and enthusiasm, training you may have done that’s relevant and how
            you are currently working on building this skill (ie. demonstrate
            you are being proactive).
          </p>
          <h2>3. What you offer to this opportunity</h2>
          <p>
            Next, let them know why you want to work on this opportunity. Some
            ideas to include here are:
          </p>
          <ul>
            <li>Your motivation</li>
            <li>Desire for experience working at this agency</li>
            <li>
              Desire to work with different people with different skill levels
              to your usual workplace
            </li>
            <li>
              Your interest in the specific topic or cohort that the opportunity
              is for
            </li>
            <li>Wish to be involved in coaching/mentoring</li>
            <li>Wish to developing skills</li>
            <li>Desire to contributing to the oneAPS vision</li>
            <li>Need a temporary change (it’s as good as a holiday!)</li>
          </ul>
          <h2>Here is an example:</h2>
          <p>
            I am currently a Service Designer working in the Design Lab at the
            Department of Health. I have most recently completed a discovery
            project with aged citizens to identify barriers they have to care in
            their homes. As a senior designer in the Design Lab I have led the
            synthesis and service mapping component of this project, identifying
            opportunities to develop and test further.
          </p>
          <p>
            I consider myself to have a strength in looking at the big picture
            (systems thinking), looking at all the touchpoints and connections
            (or dis-connections). My experience of over 10 years in service
            design and developing service blueprints on a variety of complex
            health and welfare problems will most certainly be of value working
            on this opportunity. I also have skills in workshop facilitation
            with the ability to bring groups of people together in a friendly
            work style whilst connecting the dots, will compliment this
            opportunity also.
          </p>
          <p>
            I would really like the opportunity to do some meaningful work at
            the Department of Education, Skills and Employment. I have a work
            history in secondary education and having children myself I am very
            interested in the subject of preparing our future workforce. To add
            to this I would like to gain access to a wider APS network of
            digital professionals and believe this opportunity would provide
            that.
          </p>
          <p>
            I am available to discuss further, look forward to hearing from you.
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
