import axios from "axios";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Aubtn, AuFormGroup } from "../../../types/auds";
import { IApiFormError, ILoginType } from "../../../types/types";
import { formatApiError } from "../../../util/formatApiError";
import ClientErrorDisplay from "../../blocks/clientErrors";
import PageAlert from "../../blocks/pageAlert";
import PasswordField from "../fields/PasswordField";
import TextField from "../fields/TextField";
import { initialValues, validationSchema } from "./loginSchema";

const LoginForm: React.FC = () => {
  const [errorList, setErrorList] = useState<IApiFormError[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const HandleLoginUser = async (formData: ILoginType) => {
    setSaving(true);

    const { email, password } = formData;
    try {
      const result = await axios.post(
        `/api/user/authenticate`,
        {
          EmailAddress: email,
          password,
        }
      );
      
        // navigate("/submitted/", { state: { submitted: true } });
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
          HandleLoginUser(values);
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
            <TextField id="email" label="Email" width={"xl"} required />
            <PasswordField
              id="password"
              label="Password"
              width={"xl"}
              required
            />

            <AuFormGroup>
              <Aubtn type="submit" onClick={submitForm} disabled={saving}>
                {saving ? "Submitting" : "Login"}
              </Aubtn>
            </AuFormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
