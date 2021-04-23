import * as yup from "yup";

export const initialValues = {
  opportunityId: null,
  resumeLink: "",
  userId: null,
  agency: "",
  whyPickMe: "",
  isApply: false
};

export const validationSchema = yup.object().shape({
  // jobTitle: yup.string().required(),
  // opportunityId: yup.number().required(),
  resumeLink: yup.string().nullable().url(),
  // userId: yup.number().required().moreThan(0),
  // agency: yup.string().required(),
  whyPickMe: yup.string().nullable().required("This is a required field"),

});
