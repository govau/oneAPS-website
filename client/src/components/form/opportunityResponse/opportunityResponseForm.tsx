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
import { useCreateOpportunityResponseHook, useOpportunityHook } from '../../../hooks';
import { IOpportunityResponseType } from "../../../types";

const OpportunityResponseForm: React.FC = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const user = useContext(UserContext);
  const fileUploadRef = useRef();
  const location = useLocation();

  const createOpportunityResponse = useCreateOpportunityResponseHook();
  const params = new URLSearchParams(location.search);
  const opportunityId = parseInt(params.get('opportunityId'), 10);
  const opportunity = useOpportunityHook(opportunityId);
  // const opportunityResponse = useLoadOpportunityResponseHook(opportunityId);

  useEffect(() => {
    const load = async () => {
      var result = await createOpportunityResponse.saveFn({
        opportunityId: opportunityId,
        userId: user.user.userId,
      });
    };
    load();
  }, []);

  const handlePostOpporunity = async (opportunityResponse: IOpportunityResponseType) => {
    setSaving(true);

    const { resumeLink, whyPickMe } = opportunityResponse;
    var result = await createOpportunityResponse.saveFn({
      opportunityId: opportunity.id,
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

  return (
    <>
      {opportunity && user.token ? (
        <>
          {createOpportunityResponse.errors && createOpportunityResponse.errors.length > 0 && (
            <PageAlert type="error" className="max-30">
              <>
                <h2>There was an error</h2>
                {formatApiError(createOpportunityResponse.errors)}
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
                  <div>Opportunity</div>
                  <br />
                  <div>
                    <h3>{opportunity.jobTitle}</h3>
                    {opportunity.jobDescription}
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
                      const fileUpload = fileUploadRef.current
                      if (fileUpload) {
                        const formData = new FormData();
                        for (const file of fileUpload.files) {
                          formData.append('file', file, file.name);
                        }
                        await axios.post('/api/OpportunityResponse/fileupload', formData, {
                          params: {
                            opportunityId: opportunity.id,
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
                      {saving ? "Submitting" : "Apply"}
                    </Aubtn>
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
