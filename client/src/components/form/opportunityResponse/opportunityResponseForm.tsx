import { useLocation } from "@reach/router";
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
import { useOpportunityHook, useOpportunityResponseHook } from '../../../hooks';
import { IOpportunityResponseType } from "../../../types";

const OpportunityResponseForm: React.FC = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [uploadBtn, setUploadBtn] = useState<{
    disable: boolean,
    text: string
  }>({
    disable: true,
    text: 'Upload'
  });
  const user = useContext(UserContext);
  const fileUploadRef = useRef();
  const location = useLocation();

  const { loadFn, data } = useOpportunityHook();

  const { createFn, updateFn, applyFn, uploadFn, downloadFileFn, updatedData, errors } = useOpportunityResponseHook();
  const params = new URLSearchParams(location.search);
  const opportunityId = parseInt(params.get('opportunityId'), 10);

  useEffect(() => {
    const load = async () => {
      await loadFn(opportunityId);
      await createFn({
        opportunityId: opportunityId,
        userId: user.user.userId,
      });
    };
    load();
  }, []);

  const fileDownload = async () => {
    var response = await downloadFileFn(updatedData.id, updatedData.resumeUpload);
    const url = window.URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', updatedData.resumeUpload);
    document.body.appendChild(link);
    link.click();
  }

  const applyForOpportunity = async (opportunityResponse: IOpportunityResponseType) => {
    setSaving(true);

    const { resumeLink, whyPickMe } = opportunityResponse;

    var result = await applyFn({
      ...updatedData,
      resumeLink,
      whyPickMe,
    });
    if (result) {
      setSaving(false);
      navigate(`/successfully-applied/?opportunityId=${updatedData.opportunityId}`);
    } else {
      setSaving(false);
    }
  };

  const saveChanges = async (opportunityResponse: IOpportunityResponseType) => {
    setSaving(true);

    const { resumeLink, whyPickMe } = opportunityResponse;
    var result = await updateFn({
      ...updatedData,
      resumeLink,
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
      <nav className="au-breadcrumbs" aria-label="breadcrumb">
        <ul className="au-link-list au-link-list--inline">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/opportunity">Find opportunities</Link>
          </li>
          <li>
            <Link to={`/opportunity/detail/?opportunityId=${opportunityId}`}>{data && data.jobTitle}</Link>
          </li>
          <li>Apply for opportunity</li>
        </ul>
      </nav>
      {updatedData && user.token ? (
        <>
          {updatedData.withdrawnAt ? (
            <>
              <PageAlert type="warning" className="max-30">
                <>
                  <h2>You have withdrawn your application for this opportunity</h2>
                  <p>Your application was withdrawn on {updatedData.withdrawnAt}</p>
                  <p>You can <Link to="/opportunity">find more opportunities</Link> and start another application.</p>
                </>
              </PageAlert>
            </>
          ) : (
            <>
              {updatedData.submittedAt ? (
                <PageAlert type="warning" className="max-30">
                  <>
                    <h2>You have already applied for this opportunity</h2>
                    <p>Your application was recieved on {updatedData.submittedAt}</p>
                    <p>You can <Link to="/opportunity">find more opportunities</Link> or <Link to="/post-opportunity">post your own opportunity</Link>.</p>
                  </>
                </PageAlert>
              ) : (
                <>
                  {!updatedData.opportunity.canApply ?
                    <PageAlert type="error" className="max-30">
                      <>
                        <h2>Applications for this opportunity has ended.</h2>
                        <p>This opportunity closed at {updatedData.opportunity.closedAt}</p>
                        <p>You can <Link to="/opportunity">find more opportunities</Link> or <Link to="/post-opportunity">post your own opportunity</Link>.</p>
                      </>
                    </PageAlert>
                    : (
                      <>
                        <h1>Apply for opportunity</h1>
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
                                  <AuLabel text="Opportunity name" />
                                  <div>{updatedData.opportunity.jobTitle}</div>
                                </AuFormGroup>
                                <AuFormGroup>
                                  <AuLabel text="Opportunity description" />
                                  <div style={{ whiteSpace: 'pre-wrap' }}>{updatedData.opportunity.jobDescription}</div>
                                </AuFormGroup>
                                <AuFormGroup>
                                  <AuLabel text="Applying as" />
                                  <div>{updatedData.user.name} ({updatedData.user.emailAddress})</div>
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
                                <AuFormGroup>
                                  <AuLabel text="Resume (optional)" />
                                  <div>
                                    {updatedData.resumeUpload &&
                                      <>
                                        Download <Aubtn type="button" as="tertiary" onClick={() => {
                                          fileDownload();
                                        }} disabled={saving}>
                                          {updatedData.resumeUpload}
                                        </Aubtn>
                                      </>}
                                  </div>
                                  <div>
                                    <input type="file" accept=".pdf" id="resume" ref={fileUploadRef}
                                      onChange={(e) => {
                                        if (e.currentTarget.value) {
                                          setUploadBtn({
                                            ...uploadBtn,
                                            disable: false,

                                          });
                                        } else {
                                          setUploadBtn({
                                            ...uploadBtn,
                                            disable: true,
                                          });
                                        }
                                      }} />
                                    <input
                                      type="button"
                                      className="au-btn"
                                      disabled={uploadBtn.disable}
                                      onClick={async () => {
                                        setUploadBtn({
                                          disable: true,
                                          text: 'Uploading'
                                        });
                                        const fileUpload = fileUploadRef.current;
                                        if (fileUpload) {
                                          const formData = new FormData();
                                          for (const file of fileUpload.files) {
                                            formData.append('file', file, file.name);
                                          }
                                          if (!await uploadFn(updatedData.id, formData)) {
                                          }
                                          fileUpload.value = "";
                                          setUploadBtn({
                                            disable: true,
                                            text: 'Upload'
                                          });

                                        }
                                      }} value="Upload" />
                                  </div>
                                </AuFormGroup>
                                {updatedData.opportunity.canApply && (
                                  <AuFormGroup>
                                    <Aubtn type="submit" onClick={() => {
                                      setFieldValue('isApply', false);
                                    }} disabled={saving}>
                                      {saving ? "Saving" : "Save"}
                                    </Aubtn>
                                    <Aubtn type="submit" style={{ marginLeft: '2em' }} onClick={() => {
                                      setFieldValue('isApply', true);
                                    }} disabled={saving || !user.user.emailVerified}>
                                      {saving ? "Applying" : "Apply"}
                                    </Aubtn>
                                    {!user.user.emailVerified &&
                                      <span style={{marginLeft: '1em'}}>To apply, please save and{' '}
                                        <Link
                                          to={`/register/verify-email?from=${encodeURIComponent(`/opportunity-response?opportunityId=${updatedData.opportunityId}`)}`}>
                                            verify your email
                                        </Link>.
                                      </span>
                                    }
                                  </AuFormGroup>
                                )}
                              </AuFieldset>
                            </Form>
                          )}
                        </Formik>
                      </>
                    )}
                </>
              )}
            </>
          )}

        </>
      ) : (
        <p>
          You must be{" "}
          <Link to={`/login?from=${encodeURIComponent(`/opportunity-response?opportunityId=${opportunityId}`)}`}>
            logged in
          </Link>{" "}
          to apply for an opportunity.
        </p>
      )}
    </>
  );
};

export default OpportunityResponseForm;
