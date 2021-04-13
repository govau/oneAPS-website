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
              <li>How to apply to an opportunity</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <h1>How to apply to an opportunity</h1>
          <p>Applying for an opportunity is easy.</p>
          <p>
            ​​​​​​​First, find the opportunity that is of interest to you in the{" "}
            <a href="../../find-opportunities">Find opportunities page</a>.
          </p>
          <p>
            Click on the "more" link at the bottom of the card that takes your
            interest.
          </p>
          <p>
            Once you are ready to apply for an opportunity, press the 'Apply for
            opportunity' button at the bottom of the opportunity.
          </p>
          <p>
            As part of your application, you will need to provide the following
            information:
          </p>
          <ul>
            <li>
              Make sure you have selected the correct{" "}
              <span className="bolden-text">opportunity</span> you wish to apply
              for. This is typically automatically selected for you.
            </li>
            <li>
              Your <span className="bolden-text">name</span> (which is linked to
              your GovTeams profile)
            </li>
            <li>
              The <span className="bolden-text">Agency/Department</span> you
              currently work for
            </li>
            <li>
              Write a short <span className="bolden-text">pitch</span> about why
              you should be chosen. Refer to the guide about how to{" "}
              <a href="writing-personal-pitch">write a great pitch</a> for more
              information.
            </li>
            <li>
              Choose to either upload a{" "}
              <span className="bolden-text">resume,</span> provide a link to
              your <span className="bolden-text">LinkedIn</span> profile.
            </li>
          </ul>
          <p>
            While these opportunities are not as exhaustive as some full-time
            role applications, ensuring you have a quality application will
            increase your chances of being selected.
          </p>
          <p>
            After you have applied for the opportunity, you will also receive a
            e-mail (typically to the e-mail address linked to your GovTeams
            profile) confirm the application was successfully submitted (note:
            this can take some time to come through).
          </p>
          <h2>What happens after I apply?</h2>
          <p>
            The person who posted the opportunity will review your profile or
            application (if you applied to a detail or lateral) and reach out to
            you via email to see if you’re a good match for the work. They may
            even set up a time to talk.
          </p>
          <h2>How do I know if I’m selected?</h2>
          <p>
            You’ll get an email letting you know if you’re selected. The email
            will include all of the details you’ll need to get started. We’ll
            also mark the opportunity as ‘assigned’, so it will no longer appear
            as ‘open’ and accepting applicants.
          </p>
          <p>
            You’ll also get an email if you’re not selected. Don’t give up—there
            are plenty of other opportunities available.
          </p>
          <p>
            Feel free to post questions in the comments section at the bottom of
            the opportunity or you can reach out to us as
            <a href="mailto:digitalsquads@dta.gov.au">
              digitalsquads@dta.gov.au
            </a>
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
