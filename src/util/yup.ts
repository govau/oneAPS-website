import * as yup from "yup";

export const error_passwordWeak =
  "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character";
export const error_nonGovEmail = "Only government emails are allowed to apply";
export const error_invalidEmail = "Enter a valid email";

export const passwordValidator = yup
  .string()
  .required("Enter a password")
  .max(20, "Enter a password that is less than 20 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    error_passwordWeak
  );

export const emailValidator = yup
  .string()
  .email(`${error_invalidEmail}`)
  .required("Enter an email")
  .max(255)
  .matches(/.gov.au$/, error_nonGovEmail);
