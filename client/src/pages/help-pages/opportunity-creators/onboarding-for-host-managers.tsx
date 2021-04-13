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
              <li>Guide to onboarding for host managers?</li>
            </ul>
          </nav>
        </div>
        <div className="au-body container-fluid">
          <h1>Guide to onboarding for host managers</h1>
          <h2>Before the move</h2>
          <p>
            When the opportunity participant has been chosen and notified,
            please email{" "}
            <a href="mailto:digitalsquads@dta.gov.au">
              The DTA Digital Squads team
            </a>{" "}
            to let us know.
          </p>
          <p>
            Use the plan on a page template with the opportunity participant and
            their home manager to understand everyone’s responsibilities,
            objectives and logistics.
          </p>
          <p>Here are some things that you should all have agreement on:</p>
          <ul>
            <li>What are the responsibilities of the temporary role? </li>
            <li>
              What are the immediate expectations? What are the team’s longer
              term goals?
            </li>
            <li>
              What are the agency’s or branches priorities? What projects or
              work will be most important?
            </li>
            <li>What working relationship style suits your team? </li>
            <li>
              Who are the key people that should be introduced across the
              broader organisation?
            </li>
            <li>
              What key resources or standard operating procedures is required
              for the role?
            </li>
            <li>
              What does the participant want to get out of the experience? What
              are their goals, and how can these be met within the team?
            </li>
          </ul>
          <p>
            Whatever is agreed in this plan will guide the placement as it moves
            forward.
          </p>
          <h2>Onboarding</h2>
          <p>
            When planning your opportunity, it’s important that you take into
            account what will be involved with onboarding the opportunity
            participant so they can get started as soon as possible. These
            temporary opportunities should be easy to administer so if it is
            possible to minimise the IT and security involved, that would be
            best.
          </p>
          <p>There are some questions that you will need to consider:</p>
          <p>
            <span className="bolden-text">
              How will you share files and resources?{" "}
            </span>
            For example will you setup a shared GovTeams space for the
            participant to use, or do you need to contact your IT support to see
            if you can invite external guests to collaborate in your system.
          </p>
          <p>
            <span className="bolden-text">
              What shared tools will the participant need access to?{" "}
            </span>
            For example you may wish to consider getting them a temporary
            license, depending on the tools you use. It would best best to check
            with them before on what they currently have access to.
          </p>
          <p>
            <span className="bolden-text">
              How will you conduct team rituals/meetings if needed?{" "}
            </span>
            Will they be attending in-person or participating virtually? If
            virtual, consider virtual conference tools that work best for you
            both and forward meeting invites.
          </p>
          <p>
            <span className="bolden-text">
              How often will the participant need to come into your office in
              person?{" "}
            </span>
            If it’s a small number of days then you may find that signing them
            in and escorting them around the office works best. If they are
            coming in more frequently then touch base with your security about a
            pass. Security requirements vary agency to agency.
          </p>
          <p>
            <span className="bolden-text">
              Will they be bringing their own device or will they need access to
              a device from your agency?{" "}
            </span>
            If they don’t have their own you will need to speak with your IT
            support to organise. If they do bring their own device you will need
            to organise WIFI access for them.
          </p>
          <p>
            Note that it can take 1-2 weeks for IT and/or security areas to
            organise access, so keep that in mind in your planning.
          </p>
          <h2>Getting them started</h2>
          <p>
            On-boarding someone on a temporary move to your team will be much
            the same as on-boarding any other employee
          </p>
          <ul>
            <li>
              Simple acts can make a big difference:
              <ul>
                <li>
                  assign any new temporary team members a ‘buddy’ for the first
                  few weeks to help them with on-boarding, and answer questions
                </li>
                <li>
                  If the employee is working in a different office than
                  yourself, organise someone in your team that is based in that
                  office, or a buddy from another team to greet and set them up
                </li>
                <li>
                  Have a welcome introduction to the people in the branch.
                </li>
                <li>
                  Have a team meeting to welcome them and introduce who they’ll
                  be working with, and discuss ways of working preferences
                </li>
                <li>
                  Have a team meeting to welcome them and introduce who they’ll
                  be working with, and discuss ways of working preferences
                </li>
              </ul>
            </li>
            <li>
              Induct them into the office and show the emergency exits,
              bathrooms, kitchen, first aid kit, stationary, and let them know
              if there are any housekeeping rules
            </li>
            <li>
              Share any written guides or processes that have been developed by
              the team so they have access.
            </li>
            <li>Invite the employee to any reccurring meetings</li>
          </ul>
          <h2>Supporting temporary team members</h2>
          <p>
            Supporting temporary team members throughout the experience can make
            a big difference to the success of the experience. Consider the
            following:
          </p>
          <ul>
            <li>
              Schedule fortnightly, or monthly one-on-one meetings to talk about
              the work at a broader level than the day-to-day. The employee is
              in your care for their temporary move so invest the same amount of
              time and thought as you would a permanent employee.
            </li>
            <li>
              Check in with each other in the morning and at the end of the day
              to see how they are going and if they have any questions – you can
              always change the frequency later if this proves too much or not
              enough.
            </li>
            <li>
              When they’ve been assigned a task, walk them through the process a
              few times; it shouldn’t be expected that the employee will pick it
              up straight away if it’s a new way of working.
            </li>
            <li>
              If you need to check-in with their home organisation on progress
              and performance, set up a regular check-in with their manager,
              depending on the length of the temporary move.
            </li>
          </ul>
          <p>
            If an employee on a temporary move is not meeting your expectations,
            you will need to address this situation. Temporary moves can be a
            difficult transition for employees; there may be a range of factors
            at play. You should discuss this with the employee and should also
            consider a discussion with the home manager. The Digital Squads team
            is here to assist you in this situation.
          </p>
          <p>
            In the event that you need to extend or shorten the employee’s
            temporary move, you should discuss this with the employee, home
            manager, and the Digital Squads team. There may be additional
            paperwork to complete to set out any changes to the original
            agreement.
          </p>
          <p>
            Temporary staff must be provided with a safe environment. You have
            the primary duty of care and responsibility under relevant
            jurisdiction’s work health and safety legislation while the
            opportunity participant is working for you. Note that the
            participant is still covered by their home jurisdiction’s workers’
            compensation insurance scheme.
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
