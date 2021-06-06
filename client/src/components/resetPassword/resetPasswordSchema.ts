import * as yup from "yup";

export const initialValues = {
  password: "",
  retypePassword: "",
  verificationCode: "",
};

export const validationSchema = yup.object().shape({
  verificationCode: yup.string().required('Verification code is a required field'),
  password: yup.string().required(),
  retypePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
