import * as yup from "yup";
import { emailValidation } from "../../util/yup";

export const InitialValues = {
  emailAddress: "",
};

export const validationSchema = yup.object().shape({
  emailAddress: emailValidation,
});
