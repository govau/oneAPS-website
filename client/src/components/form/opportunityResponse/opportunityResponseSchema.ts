import * as yup from "yup";

export const initialValues = {
  opportunityId: null,
  resumeLink: "",
  userId: null,
  agency: "",
  whyPickMe: "",
};

export const validationSchema = yup.object().shape({
  // jobTitle: yup.string().required(),
  // opportunityId: yup.number().required(),
  // resumeLink: yup.string().required(),
  // userId: yup.number().required().moreThan(0),
  // agency: yup.string().required(),
  whyPickMe: yup.string().required("This is a required field"),
});
