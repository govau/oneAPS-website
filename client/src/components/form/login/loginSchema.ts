import * as yup from "yup";
import { emailValidation, passwordValidation } from "../../../util/yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});
