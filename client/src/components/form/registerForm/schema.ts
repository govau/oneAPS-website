import { emailValidation, passwordValidation } from "../../../util/yup";
import * as yup from "yup";

export const InitialValues = {
  name: "",
  email: "",
  password: "",
};

export const validationSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required").min(2).max(30),
  email: emailValidation,
  password: passwordValidation,
});
