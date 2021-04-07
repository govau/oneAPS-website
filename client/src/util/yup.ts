import * as yup from "yup";

export const emailValidation = yup
  .string()
  .email("Enter a valid email")
  .required("Email is required")
  .max(255)
  .matches(/.gov.au$/, "Only government emails are allowed to apply");

export const passwordValidation = yup
  .string()
  .required("Password is required")
  .max(20)
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Your password needs to be stronger"
  );