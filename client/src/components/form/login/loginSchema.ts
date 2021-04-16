import * as yup from "yup";
import { emailValidation } from "../../../util/yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = yup.object().shape({
  email: emailValidation,
  password: yup.string().required(),
});
