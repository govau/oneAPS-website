import { Form, Formik } from "formik";
import { navigate } from "gatsby";
import React, { useState } from "react";
import { Aubtn, AuFormGroup } from "../../types/auds";
import { formatApiError } from "../../util/formatApiError";
import ClientErrorDisplay from "../blocks/clientErrors";
import PageAlert from "../blocks/pageAlert";
import TextField from "../form/fields/TextField";
import { InitialValues, validationSchema } from "./inputEmailSchema";
import { useUserHook } from "../../hooks";

export const InputEmailForm: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const { verifyResetPassword, saving, errors } = useUserHook();

  return (
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
        initialValues={InitialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (await verifyResetPassword(values)) {
            navigate(`/forget-password/email-verification`);
          }
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
              id="emailAddress"
              label="Email"
              width="lg"
              hint="Please enter your email"
              type="email"
              required
            />
            <AuFormGroup>
              <Aubtn type="submit" disabled={saving}>
                {saving ? "Submitting" : "Reset password"}
              </Aubtn>
            </AuFormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};
