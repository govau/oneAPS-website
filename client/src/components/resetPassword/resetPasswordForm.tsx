import { Form, Formik } from "formik";
import { navigate } from "gatsby";
import React, { useState } from "react";
import { Aubtn, AuFormGroup } from "../../types/auds";
import { formatApiError } from "../../util/formatApiError";
import ClientErrorDisplay from "../blocks/clientErrors";
import PageAlert from "../blocks/pageAlert";
import TextField from "../form/fields/TextField";
import PasswordField from "../form/fields/PasswordField";
import { initialValues, validationSchema } from "./resetPasswordSchema";
import { useUserHook } from '../../hooks';

export const ResetPasswordForm: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const { resetPassword, errors, saving } = useUserHook();

  return (
    <>
      <h1>Reset your password</h1>
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
          onSubmit={async (values, actions) => {
            if (await resetPassword(values) === true) {
              navigate('/forget-password/success');
            }
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
              <PasswordField id="password" label="New password" width={"lg"} required />
              <PasswordField id="retypePassword" label="Re-type your password" width={"lg"} required />
              <TextField
                id="verificationCode"
                label="Verification code"
                hint="Please check your email for the verification code"
                width={"md"}
                required
              />

              <AuFormGroup>
                <Aubtn type="submit" onClick={submitForm} disabled={saving}>
                  {saving ? "Resetting password" : "Reset password"}
                </Aubtn>
              </AuFormGroup>
            </Form>
          )}
        </Formik>
      </>
      
    </>
  );
};
