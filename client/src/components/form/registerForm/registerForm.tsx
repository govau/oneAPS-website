import { Form, Formik } from "formik";
import { navigate } from "gatsby";
import React, { useState } from "react";
import { Aubtn, AuFormGroup } from "../../../types/auds";
import { IApiFormError, IRegisterType } from "../../../types/types";
import { formatApiError } from "../../../util/formatApiError";
import ClientErrorDisplay from "../../blocks/clientErrors";
import PageAlert from "../../blocks/pageAlert";
import PasswordField from "../fields/PasswordField";
import TextField from "../fields/TextField";
import { InitialValues, validationSchema } from "./schema";

const RegisterForm: React.FC = () => {
  const [errorList, setErrorList] = useState<IApiFormError[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleRegisterUser = async (formData: IRegisterType) => {
    setSaving(true);
    alert("submitted");
    const { email, password, name } = formData;
    try {
      // const result = await axios.post(
      //   `${process.env.GATSBY_API_URL}/register`,
      //   {
      //     name,
      //     email,
      //     password,
      //   }
      // );
      navigate("/submitted/", { state: { submitted: true } });
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
        initialValues={InitialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleRegisterUser(values);
        }}
      >
        {({ errors, handleSubmit, submitForm }) => (
          <Form
            method="post"
            noValidate
            className="mb-2"
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

            <TextField
              id="name"
              label="Your name"
              width="lg"
              type="text"
              required
            />
            <TextField
              id="email"
              label="Email"
              width="lg"
              type="email"
              required
            />
            <TextField
              id="mobile"
              label="Mobile number"
              width="lg"
              hint="We’ll send you a security code by text message"
              type="text"
              required
            />
            <TextField
              id="agency"
              label="Agency/Department name"
              width="lg"
              type="text"
              required
            />
            <PasswordField
              id="password"
              hint="Minimum 8 characters, including one uppercase, one lowercase, one number and one special case character"
              label="Create a password"
              width="lg"
              required
            />
            <AuFormGroup>
              <Aubtn type="submit" onClick={submitForm} disabled={saving}>
                {saving ? "Submitting" : "Register"}
              </Aubtn>
            </AuFormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
