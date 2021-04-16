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
import { useOpportunityResponseOperationsHook } from '../../../hooks';
import { IApiFormError, IOpportunityResponseType } from "../../../types";

const OpportunityResponseForm: React.FC = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const user = useContext(UserContext);
  const fileUploadRef = useRef();
  const location = useLocation();

  const {createFn, updateFn, applyFn, updatedData, errors} = useOpportunityResponseOperationsHook();
  const params = new URLSearchParams(location.search);
  const opportunityId = parseInt(params.get('opportunityId'), 10);

  useEffect(() => {
    const load = async () => {
      var result = await createFn({
        opportunityId: opportunityId,
        userId: user.user.userId,
      });
      console.log(updatedData)      
    };
    load();
  }, []);

  const fileDownload = async () => {
    var response = await axios({
      url: `/api/opportunityresponse/${updatedData.id}/download?filename=Count_daily_R4_20201208.txt`, //your url
      method: 'GET',
      responseType: 'blob', // important
      headers: {
        Authorization: `bearer ${user.token}`,
      }
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Count_daily_R4_20201208.txt'); //or any other extension
    document.body.appendChild(link);
    link.click();
  }

  const applyForOpportunity = async (opportunityResponse: IOpportunityResponseType) => {
    setSaving(true);
    
    var result = await applyFn(updatedData);
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
    var result = await updateFn({
      id: updatedData.id,
      opportunityId: updatedData.opportunityId,
      resumeLink,
      userId: user.user.userId,
      whyPickMe,
    });
    if (result) {
      setSaving(false);
    } else {
      setSaving(false);
    }
  };

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
            initialValues={{
              initialValues,
              ...updatedData
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              if (values.isApply) {
                applyForOpportunity(values);
              } else {
                saveChanges(values);
              }
            }}
          >
            {({ errors, handleSubmit, submitForm, setFieldValue }) => (
              <Form
                method="post"
                onSubmit={(e) => {
                  handleSubmit(e);
                  if (Object.keys(errors).length < 1) {
                    return;
                  }
                  setIsError(true);
                  document.title = "Errors | Apply for Opportunity";
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
                  <AuFormGroup>
                    <h3>Opportunity details</h3>
                    <div>Job title: {updatedData.opportunity.jobTitle}</div>
                    <div>Description: {updatedData.opportunity.jobDescription}</div>
                  </AuFormGroup>
                  <AuFormGroup>
                    <h3>My details</h3>
                    <div>Name: {updatedData.user.name}</div>
                    <div>Email: {updatedData.user.emailAddress}</div>                    
                  </AuFormGroup>
                  <TextField
                    id="whyPickMe"
                    label="Why me? (Your pitch)"
                    hint=""
                    required
                    as="textarea"
                    width="xl"
                    defaultValue={updatedData.whyPickMe}
                  />
                  
                  <TextField
                    id="resumeLink"
                    label="LinkedIn Profile URL"
                    hint="Ensure your LinkedIn profile is publicly accessible"
                    type="text"
                    width="xl"
                    required
                    defaultValue={updatedData.resumeLink}
                  />
                  <input type="hidden" id="isApply" value="false" />

                  <Aubtn type="button" onClick={() => {
                        fileDownload();
                    }} disabled={saving}>
                      Download
                    </Aubtn>
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
                        await axios.post(`/api/OpportunityResponse/${updatedData.id}/fileupload`, formData, {
                          headers: {
                            Authorization: `bearer ${user.token}`
                          }
                        });
                      }
                    }} value="Upload" />
                  </AuFormGroup>
                  <AuFormGroup>
                    <Aubtn type="submit" onClick={() => {
                        setFieldValue('isApply', false);
                      }
                    } disabled={saving}>
                      {saving ? "Saving" : "Save"}
                    </Aubtn>
                    <Aubtn type="submit" onClick={() => {
                        setFieldValue('isApply', true);}
                    } disabled={saving}>
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
