import { Form, Formik } from "formik";
import { Link, navigate } from "gatsby";
import React, { useState, useEffect } from "react";
import { DateTime } from 'luxon';
import { Aubtn, AuFieldset, AuFormGroup, AuLabel } from "../../../types/auds";
import { formatApiError } from "../../../util/formatApiError";
import ClientErrorDisplay from "../../blocks/clientErrors";
import PageAlert from "../../blocks/pageAlert";
import SelectField from "../fields/SelectField";
import TextField from "../fields/TextField";
import { initialValues, validationSchema } from "./postOpportunitySchema";
import { useUserHook, useLookupHook, useOpportunityHook } from '../../../hooks';

const PostOpportunityForm: React.FC<{ opportunityId?: number }> = ({ opportunityId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [agencyText, setAgencyText] = useState<string>('');
  const { user, loggedIn, getUserFn } = useUserHook();
  const agency = useLookupHook('agency', 'an agency');
  const securityclearance = useLookupHook('securityclearance', 'a security clearance');
  const { clearFn, loadFn, createOpporunityFn, updateOpporunityFn, saving, errors, data } = useOpportunityHook();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      clearFn();
      await getUserFn();
      if (opportunityId) {
        await loadFn(opportunityId);
      }
      setLoading(false);
    }
    load();
  }, [opportunityId]);
  if (!initialValues.startDate) {
    initialValues.startDate = DateTime.now().startOf('day').toISODate();
  }
  if (!initialValues.endDate) {
    initialValues.endDate = DateTime.now().endOf('day').plus({days: 14}).toISODate();
  }
  if (data) {
    data.startDate = DateTime.fromISO(data.startDate).toISODate();
    data.endDate = DateTime.fromISO(data.endDate).toISODate();
  }
  useEffect(() => {
    if (agency.lookupData.loaded && user) {
      let found = agency.lookupData.data.find(i => i.value == user.agency);
      if (found) {
        setAgencyText(found.text);
      } else {
        setAgencyText(user.agency);
      }
    }

  }, [agency, user]);
  if (user) {
    initialValues.contactPersonEmail = user.emailAddress;
    initialValues.contactPersonName = user.name;
    initialValues.contactPersonPhone = user.mobile;
  }
  return (
    <>
      <nav className="au-breadcrumbs" aria-label="breadcrumb">
        <ul className="au-link-list au-link-list--inline">
          <li>
            <Link to="/">Home</Link>
          </li>
          {opportunityId ? (
            <>
              <li>
                <Link to="/opportunity">Find opportunities</Link>
              </li>
              <li>
                <Link to={`/opportunity/detail/?opportunityId=${opportunityId}`}>{data && data.jobTitle}</Link>
              </li>
              <li>Edit opportunity</li>
            </>
          ) : (
            <li>Post an opportunity</li>
          )}
        </ul>
      </nav>
      <>
        <h1>{opportunityId ? 'Edit ' : 'Post an '}opportunity</h1>
        {user && loggedIn ? (
          <>
            {errors && errors.length > 0 && (
              <PageAlert type="error" className="max-30">
                <>
                  <h2>There was an error</h2>
                  {formatApiError(errors)}
                </>
              </PageAlert>
            )}
            {!loading && agency.lookupData.loaded && securityclearance.lookupData.loaded && (
              <Formik
                initialValues={{
                  ...initialValues,
                  ...data,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  let success: boolean = false;
                  let opportunityId: number;
                  if (data && data.id) {
                    let result = await updateOpporunityFn(values);
                    success = result.success;
                    if (success) {
                      opportunityId = result.data.id;
                    }
                  } else {
                    let result = await createOpporunityFn(values);
                    success = result.success;
                    if (success) {
                      opportunityId = result.data.id;
                    }
                  }
                  if (success) {
                    navigate(`/successfully-posted?opportunityId=${opportunityId}`);
                  }
                }}
              >
                {({ errors, handleSubmit, submitForm, setFieldValue }) => (
                  <Form
                    method="post"
                    onSubmit={(e) => {
                      handleSubmit(e);
                      if (Object.keys(errors).length < 1) return;
                      setIsError(true);
                      document.title = "Errors | Sign up form";
                      const timeout = setTimeout(() => {
                        const errorSum = document.getElementById(
                          "error-heading"
                        ) as any;
                        if (errorSum && errorSum.focus()) {
                          errorSum.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                        clearTimeout(timeout);
                      }, 500);
                    }}
                  >
                    {isError && Object.keys(errors).length > 0 && (
                      <ClientErrorDisplay errors={errors} />
                    )}

                    <AuFieldset className="mt-2 mb-0">
                      <TextField
                        id="jobTitle"
                        label="Opportunity name"
                        hint="The title is the first thing an opportunity seeker will see. Write a catchy title that's descriptive of what the opportunity is - think about skills you need or the outcome you are trying to achieve, not just a job title. Avoid jargon."
                        width="xl"
                        required
                      />
                      <TextField
                        id="jobDescription"
                        label="What you'll do"
                        hint="In one or two paragraphs, provide a description of the opportunity. Include the intended outcome of the work, problem you are trying to solve and alignment to government strategic priorities (these can be for your department,agency or cross government)"
                        required
                        as="textarea"
                        width="xl"
                      />
                      <TextField
                        id="whatYoullGain"
                        label="What you'll gain from this experience"
                        hint="In a few sentences, add what the participant will gain or learn from this experience (e.g. build skills and experience, increase departmental knowledge,connect with subject matter experts)"
                        required
                        as="textarea"
                        width="xl"
                      />
                      <TextField
                        id="aboutTeam"
                        label="About our team"
                        hint="In one or two paragraphs, describe your team, your culture and how you work. Avoid using acronyms."
                        required
                        as="textarea"
                        width="xl"
                      />
                      <TextField
                        id="numberOfPeople"
                        label="Number of people needed"
                        type="number"
                        width="xs"
                        required
                      />
                      <TextField
                        id="location"
                        label="Location"
                        hint="Any preference to be in a certain location, or is it flexible to be virtual?"
                        type="text"
                        required
                      />
                      <TextField
                        id="skills"
                        label="Relevant skills"
                        hint="Separate by commas, e.g. photoshop, web design, logo design."
                        as="textarea"
                        width="xl"
                        required
                      />
                      <TextField
                        id="additionalInfo"
                        label="Additional information (optional)"
                        hint="Is there anything else you would like to add?"
                        as="textarea"
                        width="xl"
                      />
                    </AuFieldset>
                    <TextField
                      id="startDate"
                      label="Estimated start date"
                      hint="When would you be ready to onboard the participant?"
                      type="date"
                      required
                    />
                    <TextField
                      id="endDate"
                      label="When would you like the opportunity to be completed?"
                      type="date"
                      required
                    />
                    <TextField
                      id="commitmentTime"
                      label="Commitment time"
                      hint="Enter a particular amount of hours or days per week or whether it's negotiable. For example, 2 - 4 hours per week on a Monday or Tuesday."
                      type="text"
                      width="xl"
                      required
                    />
                    <SelectField
                      id="securityClearance"
                      label="Security Clearance"
                      hint="What level of security clearance is needed to complete the opportunity?"
                      options={securityclearance.lookupData.data}
                      required
                    />
                    <AuFormGroup>
                      <AuLabel htmlFor="agencyText" text="Department/Agency name" />
                      <div style={{ marginTop: '1em' }} id="agencyText">{agencyText}</div>
                    </AuFormGroup>
                    <TextField
                      id="contactPersonName"
                      label="Contact person name"
                      hint="Contact name for this opportunity"
                      type="text"
                      width="lg"
                      required
                    />
                    <TextField
                      id="contactPersonEmail"
                      label="Contact person email"
                      hint="Contact e-mail address for this opportunity"
                      type="email"
                      width="lg"
                      required
                    />
                    <TextField
                      id="contactPersonPhone"
                      label="Contact person phone (optional)"
                      hint="Contact phone number for this opportunity"
                      type="text"
                    />
                    <input type="hidden" id="isPosting" value="false" />

                    <AuFormGroup>
                      <Aubtn type="submit" onClick={() => {
                        setFieldValue('isPosting', false);
                      }} disabled={saving}>
                        {saving ? "Saving" : "Save"}
                      </Aubtn>
                      {(!data || (data && !data.publishedAt)) && (
                        <Aubtn type="submit" style={{ marginLeft: '2em' }} onClick={() => {
                          setFieldValue('isPosting', true);
                        }} disabled={saving}>
                          {saving ? "Posting" : "Post"}
                        </Aubtn>
                      )}
                    </AuFormGroup>
                  </Form>
                )}
              </Formik>
            )}
          </>
        ) : (
          <p>
            You must be{" "}
            <Link to={`/login?from=${encodeURIComponent('/post-opportunity')}`}>
              logged in
            </Link>{" "}to post an opportunity.
          </p>
        )}
      </>
    </>
  );
};

export default PostOpportunityForm;
