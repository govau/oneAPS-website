import { useLocation } from "@reach/router";
import axios from "axios";
import { Form, Formik } from "formik";
import { Link, navigate } from "gatsby";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { Aubtn, AuFieldset, AuFormGroup } from "../../../types/auds";
import { IApiFormError, IOpportunityResponseType } from "../../../types/types";
import { formatApiError } from "../../../util/formatApiError";
import ClientErrorDisplay from "../../blocks/clientErrors";
import PageAlert from "../../blocks/pageAlert";
import TextField from "../fields/TextField";
import { initialValues, validationSchema } from "./opportunityResponseSchema";

const OpportunityResponseForm: React.FC = () => {
  const [errorList, setErrorList] = useState<IApiFormError[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [agency, setAgency] = useState<{
    loaded: boolean;
    data: { value: string; text: string }[];
  }>({ loaded: false, data: [] });
  const user = useContext(UserContext);
  const fileUploadRef = useRef();
  const location = useLocation();

  useEffect(() => {
    if (agency.loaded) {
      return;
    }
    const loadAgency = async () => {
      const result = await axios.get(`/api/lookup`, {
        params: {
          name: "agency",
        },
      });
      const data = [{ text: "Please select an agency", value: null }].concat(
        result.data
      );
      setAgency({
        loaded: true,
        data,
      });
    };
    loadAgency();
  }, []);

  const handlePostOpporunity = async (formData: IOpportunityResponseType) => {
    setSaving(true);

    const { resumeLink, whyPickMe } = formData;
    try {
      const result = await axios.post(
        `/api/OpportunityResponse`,
        {
          opportunityId: location.state.id,
          resumeLink,
          userId: user.user.userId,
          whyPickMe,
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
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
      {user.token ? (
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
                  <div>Opportunity</div>
                  <br />
                  <div>
                    <h3>{location.state.jobTitle}</h3>
                    {location.state.jobDescription}
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

                  {/* <input type="file" id="myfile" ref={fileUploadRef} />
              <input type="button" onClick={async () => {
                const fileUpload = fileUploadRef.current
                if (fileUpload) {
                  const file = fileUpload.files[0];
                  // var xhr = new XMLHttpRequest();                 
                  // var file = document.getElementById('myfile').files[0];
                  // xhr.open("POST", "api/myfileupload");
                  // xhr.setRequestHeader("filename", file.name);
                  // xhr.send(file);
                  await axios.post('/api/OpportunityResponse/fileupload', {
                    headers: {
                      "filename": file.name
                    }
                  });
                }
              }} value="Upload" /> */}
                  <AuFormGroup>
                    <Aubtn type="submit" onClick={submitForm} disabled={saving}>
                      {saving ? "Submitting" : "Post"}
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
