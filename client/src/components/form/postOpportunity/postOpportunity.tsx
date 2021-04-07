import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Aubtn, AuFieldset, AuFormGroup, AuLegend } from "../../../types/auds";
import { IApiFormError, ILoginType } from "../../../types/types";
import { formatApiError } from "../../../util/formatApiError";
import ClientErrorDisplay from "../../blocks/clientErrors";
import PageAlert from "../../blocks/pageAlert";
import SelectField from "../fields/SelectField";
import TextField from "../fields/TextField";
import { initialValues, validationSchema } from "./postOpportunitySchema";

const PostOpportunityForm: React.FC = () => {
  const [errorList, setErrorList] = useState<IApiFormError[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handlePostOpporunity = async (formData: ILoginType) => {
    setSaving(true);

    const { email, password } = formData;
    try {
      // const result = await axios.post(
      //   `${process.env.GATSBY_API_URL}/register`,
      //   {
      //     name,
      //     email,
      //     password,
      //   }
      // );
      //   navigate("/submitted/", { state: { submitted: true } });
    } catch (e) {
      // const error = e.response.data;
      // if (error.errors) {
      //   setErrorList(error.errors);
      // }
    }
    setSaving(false);
  };

  return (
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
        initialValues={initialValues}
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
              <AuLegend level="3">
                <h2>About job</h2>
              </AuLegend>
              <TextField id="jobTitle" label="Opportuity title" required />
              <TextField
                id="jobDescription"
                label="What you'll do"
                required
                as="textarea"
                width="xl"
              />
              <TextField
                id="whatYoullGain"
                label="What you'll gain from this experience"
                required
                as="textarea"
                width="xl"
              />
              <TextField
                id="aboutTeam"
                label="About our team"
                required
                as="textarea"
                width="xl"
              />
              <TextField
                id="numberOfPeople"
                label="Number of people needed"
                type="number"
                required
              />
              <TextField id="location" label="Location" type="text" required />
              <TextField
                id="skills"
                label="Relevant skills"
                hint="Seperate by commas, e.g. photoshop, web design, logo design"
                as="textarea"
                required
              />
              <TextField
                id="additionalInfo"
                label="Additional information (optional)"
                as="textarea"
              />
            </AuFieldset>
            <TextField
              id="startDate"
              label="Estimated start date"
              type="text"
              required
            />
            <TextField
              id="endDate"
              label="Estimated end date"
              type="text"
              required
            />
            <TextField
              id="endDate"
              label="Estimated end date"
              type="text"
              required
            />
            <TextField
              id="commitmentTime"
              label="Commitment Time"
              type="text"
              required
            />
            <TextField
              id="agency"
              label="Department/Agency name"
              type="text"
              required
            />
            <TextField
              id="contactPersonName"
              label="Contact person name"
              type="text"
              required
            />
            <TextField
              id="contactPersonEmail"
              label="Contact person name"
              type="text"
              required
            />
            <TextField
              id="contactPersonPhone"
              label="Contact person phone (optional)"
              type="text"
            />

            <SelectField
              id="securityClearance"
              label="Security Clearance"
              options={[
                { text: "Select", value: "" },
                { text: "Baseline", value: "baseline" },
                { text: "nv1", value: "nv1" },
                { text: "nv2", value: "nv2" },
                { text: "pv", value: "pv" },
                { text: "None", value: "none" },
              ]}
            ></SelectField>

            <AuFormGroup>
              <Aubtn type="submit" onClick={submitForm} disabled={saving}>
                {saving ? "Submitting" : "Post"}
              </Aubtn>
            </AuFormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PostOpportunityForm;
