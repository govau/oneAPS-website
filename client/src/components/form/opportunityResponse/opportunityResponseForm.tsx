import { useLocation } from "@reach/router";
import axios from "axios";
import { Form, Formik } from "formik";
import { Link, navigate } from "gatsby";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { Aubtn, AuFieldset, AuFormGroup } from "../../../types/auds";
import {
  IApiFormError,
  IOpportunityResponseType,
  IOpportunityType,
} from "../../../types/types";
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

  const [oppData, setOppData] = React.useState<IOpportunityType[]>([]);

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

    async function getData() {
      try {
        var cardID = location.state.id
          ? location.state.id
          : location.search.slice(13, location.search.length); //get the card id
        const result = await axios.get("/api/Opportunity/" + cardID);
        if (result.status === 200) {
          setOppData(result.data);
        }
      } catch (e) {}
    }
    getData();
  }, []);

  const handlePostOpporunity = async (opportunityResponse: IOpportunityResponseType) => {
    setSaving(true);

    const { resumeLink, whyPickMe } = opportunityResponse;
    const formData = new FormData();
    const fileUpload = fileUploadRef.current
    if (fileUpload) {
      for (const file of fileUpload.files) {
        formData.append('file', file, file.name);
      }
    }
    formData.append('data', JSON.stringify({
      opportunityId: oppData.id,
      resumeLink,
      userId: user.user.userId,
      whyPickMe,
    }));
    
    try {
      const result = await axios.post(
        `/api/OpportunityResponse`,
        formData, {
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
                    <h3>{oppData.jobTitle}</h3>
                    {oppData.jobDescription}
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

                  <input type="file" ref={fileUploadRef} />
                  {/* <input type="button" onClick={async () => {
                    const fileUpload = fileUploadRef.current
                    if (fileUpload) {
                      const formData = new FormData();
                      for (const file of fileUpload.files) {
                        // const file = fileUpload.files[0];
                        formData.append('file', file, file.name);
                      }
                      formData.append('userId', 2);
                      // var xhr = new XMLHttpRequest();                 
                      // var file = document.getElementById('myfile').files[0];
                      // xhr.open("POST", "api/myfileupload");
                      // xhr.setRequestHeader("filename", file.name);
                      // xhr.send(file);
                      await axios.post('/api/OpportunityResponse/fileupload', formData, {
                        headers: {
                          Authorization: `bearer ${user.token}`,
                          // "filename": file.name
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
