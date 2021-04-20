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
              <li>Creating a new opportunity</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <h1>Creating a new opportunity</h1>
          <p>
            Our <Link to="/post-opportunity">Post an Opportunity form</Link>{" "}
            has hints in each of the text fields to assist you with creating an
            opportunity.
          </p>
          <h2>​​​​​​​Opportunity name</h2>
          <p>
            Write a catchy and descriptive title. The title is the first thing
            an opportunity seeker will see on your post.
            <ul>
              <li>
                Make sure it’s easy to understand and descriptive of what the
                opportunity is.
              </li>
              <li>
                Use keywords that will catch the seeker’s interest and make it
                easier to search for.
              </li>
              <li>Focus on skills — not just a job title.</li>
            </ul>
            <p>
              <span className="bolden-text">Example</span>
              <br />
              “Looking for someone to assist with research with strong data
              analysis skills in Excel” is better than “Looking for a Research
              Assistant”.
            </p>
          </p>
          <h2>​​​​​​​Contact person</h2>
          <p>
            When you type your name it links to your GovTeams profile. It’s
            important all the information here is up-to-date.
          </p>
          <h2>​​​​​​​Contact email</h2>
          <p>
            This is the email address the applicant and Digital Squads team will
            be using to contact you.
          </p>
          <h2>​​​​​​​Contact phone (optional)</h2>
          <p>
            This is the phone number the applicant and Digital Squads team will
            be using to contact you if needed.
          </p>
          <h2>​​​​​​​Department/Agency</h2>
          <p>
            Let the applicant know which government department or agency they’ll
            be having experience working with by selecting from the drop-down
            menu.
          </p>
          <h2>​​​​​​​What you'll do</h2>
          <p>
            This is where you describe the opportunity, exactly what needs to be
            done and what deliverables you expect.
          </p>
          <p>
            Include things like the problem you are trying to solve and
            alignment to government strategic priorities (these can be for your
            department, agency or cross government).
          </p>
          <p>
            <span className="bolden-text">Tips:</span>
            <ul>
              <li>Include the most important information first</li>
              <li>
                Make sure the first three sentences include the most important
                information about your opportunity, because this will appear
                under the title in the search results.
              </li>
              <li>
                Be descriptive enough to get the participant’s attention without
                being long-winded—think of this as your elevator pitch.
              </li>
              <li>
                Be concise, but offer enough details so the participant knows
                what’s involved.
              </li>
              <li>
                Include information on how their work will be used—this helps
                participants understand their work is part of a greater effort.
              </li>
            </ul>
          </p>
          <h2>​​​​​​​What you'll gain from this experience</h2>
          <p>
            The goal of Digital Squads is to help participants learn, grow and
            network.
          </p>
          <p>
            Tell the digital professional what’s in it for them. Include things
            that let them know what they will gain from this experience, e.g.
            experience of working in your agency or on a different subject
            matter, contributing to a meaningful piece of work or building
            skills.
          </p>
          <p>
            Tips
            <ul>
              <li>List the types of skills they may gain.</li>
              <li>
                Describe who they will connect with and other networking
                benefits.
              </li>
              <li>Include any other benefits.</li>
            </ul>
          </p>
          <p>
            <span className="bolden-text">Example:</span>
            <br />
            The OneGov usability team asks for help with doing wireframes. They
            clearly stated that using ToolA was part of the task, but they would
            accept a participant who was willing to learn ToolA basics.
          </p>

          <h2>​​​​​​​About our team</h2>
          <p>
            Describe your team, department / agency and what makes them unique.
          </p>
          <p>
            Include information about the ways they work and who the participant
            will work with on a regular basis.
          </p>
          <p>
            <span className="bolden-text">Example:</span>
            <br />
            <p>
              Joining us for this opportunity means joining a digital team of
              thinkers and doers from diverse disciplines, ages and experiences
              – all while helping each other learn and grow.
            </p>
            <p>
              Our multidisciplinary team includes a service designer, agile
              lead, user researcher and visual scribe. We are a very open and
              collaborative team with supportive management of the ways we work.
              You will work with our senior user researcher who is very
              experienced in both user research and coaching.
            </p>
          </p>
          <h2>​​​​​​​Relevant skills</h2>
          <p>
            Add skills to your opportunity by selecting from the *drop-down menu
            of skills. It would be good to think about the kinds of skills you
            might like from the applicant both soft and hard. If you don’t see
            the skills you are after in the drop-down you can type it in
            manually followed by enter.
          </p>
          <h2>Additional information</h2>
          <p>
            This is optional but a good place to add anything that you might not
            have included above. Some things might include attributes that are
            desirable or logistics about working from another office or
            virtually.
          </p>

          <h2>​​​​​​​Number of people needed</h2>
          <p>
            Enter how many people you have this opportunity for. It is an open
            text field in case you have a variable. Eg. 1-2
          </p>
          <h2>​​​​​​​Commitment time</h2>
          <p>
            Let the applicant know whether it's a particular amount of hours or
            days per week they are needed or whether it's negotiable. For
            example, 2 - 4 hours per week on a Monday or Tuesday.
          </p>
          <h2>​​​​​​​Location</h2>
          <p>
            Think about whether the participant is required to come into your
            office or if they can work virtual.
          </p>
          <h2>​​​​​​​Security clearance</h2>
          <p>
            The options here are none, baseline, negative vetting level 1,
            negative vetting level 2. Most departments/agency’s will require a
            baseline security but may not always depending on the opportunity.
          </p>
          <h2>Estimated start date</h2>
          <p>
            Enter the date you want the participant to onboard to your team.
          </p>
          <h2>​​​​​​​Estimated end date</h2>
          <p>
            Enter the opportunity to be completed by and participant finish with
            your team.
          </p>
          <br />
          <br />
          <p>
            *The skills list currently comes from the skills framework provided
            from SFIA as well as ATO
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
