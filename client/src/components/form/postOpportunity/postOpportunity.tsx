import axios from "axios";
import { Form, Formik } from "formik";
import { Link, navigate } from "gatsby";
import React, { useContext, useState, useEffect } from "react";
import { Aubtn, AuFieldset, AuFormGroup } from "../../../types/auds";
import { IApiFormError, IOpportunityType } from "../../../types/types";
import { formatApiError } from "../../../util/formatApiError";
import ClientErrorDisplay from "../../blocks/clientErrors";
import PageAlert from "../../blocks/pageAlert";
import SelectField from "../fields/SelectField";
import TextField from "../fields/TextField";
import { initialValues, validationSchema } from "./postOpportunitySchema";
import { useUserHook, useLookupHook } from '../../../hooks';

const PostOpportunityForm: React.FC = () => {
  const [errorList, setErrorList] = useState<IApiFormError[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const user = useUserHook();
  const agency = useLookupHook('agency');
  const securityclearance = useLookupHook('securityclearance');

  useEffect(() => {
    user.getUserFn();
  }, []);

  const handlePostOpporunity = async (formData: IOpportunityType) => {
    setSaving(true);

    const {
      id,
      jobTitle,
      jobDescription,
      whatYoullGain,
      aboutTeam,
      numberOfPeople,
      startDate,
      endDate,
      commitmentTime,
      agency,
      contactPersonName,
      contactPersonEmail,
      contactPersonPhone,
      location,
      skills,
      additionalInfo,
      securityClearance,
    } = formData;
    try {
      const result = await axios.post(
        `/api/Opportunity`,
        {
          id,
          jobTitle,
          jobDescription,
          whatYoullGain,
          aboutTeam,
          numberOfPeople: `${numberOfPeople}`,
          startDate,
          endDate,
          commitmentTime,
          agency,
          contactPersonName,
          contactPersonPhone,
          contactPersonEmail,
          location,
          skills,
          additionalInfo,
          securityClearance,
        },
        { headers: { Authorization: `bearer ${user.token}` } }
      );
      navigate("/find-opportunities");
      return;
    } catch (e) {
      if (e.response.status === 400) {
        let errors: IApiFormError[] = [];
        for (const property in e.response.data.errors) {
          for (const message of e.response.data.errors[property]) {
            errors.push({
              message,
              path: property,
            });
          }
        }
        setErrorList(errors);
      }
    }
    setSaving(false);
  };

  return (
    <>
      {user.user && user.loggedIn ? (
        <>
          {errorList && errorList.length > 0 && (
            <PageAlert type="error" className="max-30">
              <>
                <h2>There was an error</h2>
                {formatApiError(errorList)}
              </>
            </PageAlert>
          )}
          <Formik
            initialValues={{
              ...initialValues,
              agency: user.user.agency,
              contactPersonEmail: user.user.emailAddress,
              contactPersonName: user.user.name,
              contactPersonPhone: user.user.mobile,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handlePostOpporunity(values);
            }}
          >
            {({ errors, handleSubmit, submitForm }) => (
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
                    label="Opportunity name:"
                    hint="The title is the first thing an opportunity seeker will see. Write a catchy title that's descriptive of what the opportunity is - think about skills you need or the outcome you are trying to achieve, not just a job title. Avoid jargon."
                    width="xl"
                    required
                  />
                  <TextField
                    id="jobDescription"
                    label="What you'll do:"
                    hint="In one or two paragraphs, provide a description of the opportunity. Include the intended outcome of the work, problem you are trying to solve and alignment to government strategic priorities (these can be for your department,agency or cross government)"
                    required
                    as="textarea"
                    width="xl"
                  />
                  <TextField
                    id="whatYoullGain"
                    label="What you'll gain from this experience:"
                    hint="In a few sentences, add what the participant will gain or learn from this experience (e.g. build skills and experience, increase departmental knowledge,connect with subject matter experts)"
                    required
                    as="textarea"
                    width="xl"
                  />
                  <TextField
                    id="aboutTeam"
                    label="About our team:"
                    hint="In one or two paragraphs, describe your team, your culture and how you work. Avoid using acronyms."
                    required
                    as="textarea"
                    width="xl"
                  />
                  <TextField
                    id="numberOfPeople"
                    label="Number of people needed:"
                    type="number"
                    width="xs"
                    required
                  />
                  <TextField
                    id="location"
                    label="Location:"
                    hint="Any preference to be in a certain location, or is it flexible to be virtual?"
                    type="text"
                    required
                  />
                  <TextField
                    id="skills"
                    label="Relevant skills:"
                    hint="Separate by commas, e.g. photoshop, web design, logo design."
                    as="textarea"
                    width="xl"
                    required
                  />
                  <TextField
                    id="additionalInfo"
                    label="Additional information (optional):"
                    hint="Is there anything else you would like to add?"
                    as="textarea"
                    width="xl"
                  />
                </AuFieldset>
                <TextField
                  id="startDate"
                  label="Estimated start date:"
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
                  label="Commitment time:"
                  hint="Enter a particular amount of hours or days per week or whether it's negotiable. For example, 2 - 4 hours per week on a Monday or Tuesday."
                  type="text"
                  width="xl"
                  required
                />
                <SelectField
                  id="agency"
                  label="Department/Agency name"
                  width="lg"
                  options={agency.data}
                  required
                />
                <TextField
                  id="contactPersonName"
                  label="Contact person name:"
                  hint="Contact name for this opportunity"
                  type="text"
                  width="lg"
                  required
                />
                <TextField
                  id="contactPersonEmail"
                  label="Contact person email:"
                  hint="Contact e-mail address for this opportunity"
                  type="email"
                  width="lg"
                  required
                />
                <TextField
                  id="contactPersonPhone"
                  label="Contact person phone (optional):"
                  hint="Contact phone number for this opportunity"
                  type="text"
                />
                <SelectField
                  id="securityClearance"
                  label="Security Clearance"
                  hint="What level of security clearance is needed to complete the opportunity?"
                  options={securityclearance.data}
                  required
                />

                <AuFormGroup>
                  <Aubtn type="submit" onClick={submitForm} disabled={saving}>
                    {saving ? "Submitting" : "Post"}
                  </Aubtn>
                </AuFormGroup>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <p>
          You must be{" "}
          <Link to="../../login" state={{ fromPage: "/post-opportunity" }}>
            logged in
          </Link>{" "}
          to post an opportunity.
        </p>
      )}
    </>
  );
};

export default PostOpportunityForm;
