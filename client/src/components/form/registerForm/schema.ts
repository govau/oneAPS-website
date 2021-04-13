import * as yup from "yup";
import { emailValidation, passwordValidation } from "../../../util/yup";

export const InitialValues = {
  name: "",
  emailAddress: "",
  mobile: "",
  agency: "",
  password: "",
  passwordConfirm: "",
};

export const validationSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required").min(2).max(30),
  emailAddress: emailValidation,
  password: passwordValidation,
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  agency: yup
    .string()
    .trim()
    .required("Agency/Department name is required")
    .min(2, "Enter a valid agency"),
  mobile: yup.string().trim().required("Mobile number is required").length(10),
});
