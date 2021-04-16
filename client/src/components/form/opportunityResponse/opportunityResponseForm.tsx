import { useLocation } from "@reach/router";
import axios from "axios";
import { Form, Formik } from "formik";
import { Link, navigate } from "gatsby";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { 
  Aubtn,
  AuFieldset,
  AuFormGroup,
  AuLabel
} from "../../../types/auds";

import { formatApiError } from "../../../util/formatApiError";
import ClientErrorDisplay from "../../blocks/clientErrors";
import PageAlert from "../../blocks/pageAlert";
import TextField from "../fields/TextField";
import { initialValues, validationSchema } from "./opportunityResponseSchema";
import { useCreateOpportunityResponseHook, useApplyOpportunityResponseHook } from '../../../hooks';
import { IApiFormError, IOpportunityResponseType } from "../../../types";

const OpportunityResponseForm: React.FC = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const user = useContext(UserContext);
  const fileUploadRef = useRef();
  const location = useLocation();

  const {saveFn, updatedData, errors: createErrors} = useCreateOpportunityResponseHook();
  const {applyFn, errors: applyErrors  } = useApplyOpportunityResponseHook();
  const params = new URLSearchParams(location.search);
  const opportunityId = parseInt(params.get('opportunityId'), 10);

  useEffect(() => {
    const load = async () => {
      var result = await saveFn({
        opportunityId: opportunityId,
        userId: user.user.userId,
      });
    };
    load();
  }, []);

  const applyForOpportunity = async () => {
    setSaving(true);
    
    var result = await applyFn(updatedData.id);
    if (result) {
      setSaving(false);
      navigate('/find-opportunities');
    } else {
      setSaving(false);
    }
  };

  const saveChanges = async (opportunityResponse: IOpportunityResponseType) => {
    setSaving(true);

    const { resumeLink, whyPickMe } = opportunityResponse;
    var result = await saveFn({
      opportunityId: updatedData.opportunity.id,
      resumeLink,
      userId: user.user.userId,
      whyPickMe,
    });
    if (result) {
      setSaving(false);
      navigate('/find-opportunities');
    } else {
      setSaving(false);
    }
  };

  const errors: IApiFormError[] = (createErrors || []).concat(applyErrors || []);
  return (
    <>
      {updatedData && user.token ? (
        <>
          {errors && errors.length > 0 && (
            <PageAlert type="error" className="max-30">
              <>
                <h2>There was an error</h2>
                {formatApiError(errors)}
              </>
            </PageAlert>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              saveChanges(values);
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
                  <div>
                    <h3>Opportunity details</h3>
                    <div>Job title: {updatedData.opportunity.jobTitle}</div>
                    <div>Description: {updatedData.opportunity.jobDescription}</div>
                  </div>
                  <div>
                    <h3>My details</h3>
                    <div>Name: {updatedData.user.name}</div>
                    <div>Email: {updatedData.user.emailAddress}</div>                    
                  </div>
                  <TextField
                    id="whyPickMe"
                    label="Why me? (Your pitch)"
                    hint=""
                    required
                    as="textarea"
                    width="xl"
                  />
                  <TextField
                    id="resumeLink"
                    label="LinkedIn Profile URL"
                    hint="Ensure your LinkedIn profile is publicly accessible"
                    type="text"
                    width="xl"
                    required
                  />
                  <AuFormGroup>
                    <AuLabel htmlFor="resume" text="Resume (optional)" />
                    <input type="file" id="resume" ref={fileUploadRef} />
                    <input type="button" className="au-btn" onClick={async () => {
                      const fileUpload = fileUploadRef.current;
                      if (fileUpload) {
                        const formData = new FormData();
                        for (const file of fileUpload.files) {
                          formData.append('file', file, file.name);
                        }
                        await axios.post('/api/OpportunityResponse/fileupload', formData, {
                          params: {
                            opportunityId: updatedData.opportunity.id,
                          },
                          headers: {
                            Authorization: `bearer ${user.token}`
                          }
                        });
                      }
                    }} value="Upload" />
                  </AuFormGroup>
                  <AuFormGroup>
                    <Aubtn type="submit" onClick={submitForm} disabled={saving}>
                      {saving ? "Saving" : "Save"}
                    </Aubtn>
                    <Aubtn type="submit" onClick={applyForOpportunity} disabled={saving}>
                      {saving ? "Applying" : "Apply"}
                    </Aubtn>
                  </AuFormGroup>
                  <AuFormGroup>
                  </AuFormGroup>
                </AuFieldset>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <p>
          You must be{" "}
          <Link
            to="../../login"
            state={{ fromPage: location.pathname + location.search }}
          >
            logged in
          </Link>{" "}
          to apply for an opportunity.
        </p>
      )}
    </>
  );
};

export default OpportunityResponseForm;
