import * as yup from "yup";

export const initialValues = {
  verificationCode: "",
};

export const validationSchema = yup.object().shape({
  verificationCode: yup.string().required('Verification code is a required field'),
});
