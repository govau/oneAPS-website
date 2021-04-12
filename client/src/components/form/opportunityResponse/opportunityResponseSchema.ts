import * as yup from "yup";

export const initialValues = {
  jobTitle: "",
};

export const validationSchema = yup.object().shape({
  jobTitle: yup.string().required()
});
