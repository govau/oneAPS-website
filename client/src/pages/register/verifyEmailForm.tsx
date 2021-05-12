import { Form, Formik } from "formik";
import { Link, navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import { Aubtn, AuFormGroup } from "../../types/auds";
import { formatApiError } from "../../util/formatApiError";
import ClientErrorDisplay from "../../components/blocks/clientErrors";
import PageAlert from "../../components/blocks/pageAlert";
import TextField from "../../components/form/fields/TextField";
import { initialValues, validationSchema } from "./verifyEmailSchema";
import { useUserHook } from '../../hooks';

interface VerifyEmailProps {
  fromPage: string;
}

const navigateTo = (fromPage) => {
  const navigateTo = fromPage ? decodeURIComponent(fromPage): '/dashboard';
  navigate(navigateTo);
}

const VerifyEmailForm: React.FC<VerifyEmailProps> = ({ fromPage }: VerifyEmailProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const { verifyEmail, getUserFn, resendVerifyEmail, errors, saving, user } = useUserHook();

  useEffect(() => {
    getUserFn();
  }, []);

  if (user && user.emailVerified) {
    navigateTo(fromPage);
  }

  return (
    <>
      <h1>Verify your email</h1>
      {user && 
      <>
        <p>A verification code was sent to {user.emailAddress}. Please use the verification code below.</p>
        <p>You can come back later from <Link to="/dashboard">your profile</Link> to verify your email</p>
        <p>Once you have verified your email, you will be able to post and apply for opportunities.</p>
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
            if (await verifyEmail(values) === true) {
              navigateTo(fromPage);
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
              <TextField id="verificationCode" label="Verification code" width={"md"} required />

              <p>
                You can try <a href="" onClick={async (e) => {
                    e.preventDefault();
                    await resendVerifyEmail();
                  }}>sending a new verification code</a> to "{user.emailAddress}" if you didn't recieve an email.
              </p>


              <AuFormGroup>
                <Aubtn type="submit" onClick={submitForm} disabled={saving}>
                  {saving ? "Verifying" : "Verify"}
                </Aubtn>
              </AuFormGroup>
            </Form>
          )}
        </Formik>
      </>
      }
      
    </>
  );
};

export default VerifyEmailForm;
