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
        <nav className="au-breadcrumbs" aria-label="breadcrumb">
          <ul className="au-link-list au-link-list--inline">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>How to write a great opportunity</li>
          </ul>
        </nav>
        <h1>How to write a great opportunity</h1>
        <p>
          Well-written opportunities will attract better qualified and more
          informed applicants.
          </p>
        <p>
          The following tips will help you write clear, descriptive and
          successful opportunity announcements.
          </p>
        <h2>Keep opportunities small and simple</h2>
        <ul>
          <li>
            If you have a big project, consider dividing it into smaller tasks
            and make each task a separate opportunity.
            </li>
          <li>
            You can post several opportunities at the same time, rather than
            sequentially, to make sure your entire project gets done.
            </li>
        </ul>
        <h2>Drop the jargon</h2>
        <ul>
          <li>
            Write your opportunities in plain language — use simple words and
            phrases.
            </li>
          <li>
            Use full office names instead of acronyms and avoid using
            office-specific slang.
            </li>
          <li>
            Include links to relevant resources that will help participants
            understand what they will be doing.
            </li>
        </ul>
        <h2>Speak to the participant</h2>
        <ul>
          <li>
            Use pronouns to personalise the content and experience (i.e. use
            “you”, “your”).
            </li>
          <li>
            Take the participant’s perspective — what do they need to know
            about this opportunity? What’s in it for them?
            </li>
          <li>Only include content that the participant needs.</li>
          <li>
            Define exactly what needs to be done and what deliverables you
            expect. Include links or examples of documents that the
            participant will need to work on or will better explain the tasks.
            </li>
          <li>
            Read the opportunity as if you’re new to the government – does it
            make sense?
            </li>
        </ul>
        <h2>Organise the content logically</h2>
        <ul>
          <li>
            Place the most important information at the top of each section in
            the opportunity announcement.
            </li>
          <li>
            Use bulleted lists to break out separate duties and
            qualifications.
            </li>
        </ul>
        <h2>Double check your work</h2>
        <ul>
          <li>
            Once you’ve written your opportunity, ask yourself these key
            questions:
            </li>
          <li>Does the content make sense when you read it out loud?</li>
          <li>Did you put the right content in the right sections?</li>
          <li>Is any of the content repetitive?</li>
        </ul>
      </>
    </DefaultLayout>
  );
};

export default AboutPage;
