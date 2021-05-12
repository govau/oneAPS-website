import * as yup from "yup";
import { emailValidation } from "../../../util/yup";

export const initialValues = {
  jobTitle: "",
  jobDescription: "",
  whatYoullGain: "",
  aboutTeam: "",
  numberOfPeople: "",
  location: "",
  skills: "",
  additionalInfo: "",
  startDate: "",
  endDate: "",
  commitmentTime: "",
  contactPersonName: "",
  contactPersonEmail: "",
  contactPersonPhone: "",
  securityClearance: "",
  isPosting: false
};

export const validationSchema = yup.object().shape({
  jobTitle: yup.string().required("Opportunity name is required"),
  jobDescription: yup.string().required("What You'll Do is required"),
  whatYoullGain: yup.string().required("What You'll Gain is required"),
  aboutTeam: yup.string().required("About Your Team is required"),
  numberOfPeople: yup.string().required("Number of people is required"),
  location: yup.string().required("Location is required"),
  skills: yup.string().required("Skills is required"),
  additionalInfo: yup.string(),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup.date().required("End Date is required"),
  commitmentTime: yup.string().required("Commitment Time is required"),
  contactPersonName: yup.string().nullable().required("Contact Person Name is required"),
  contactPersonEmail: emailValidation,
  contactPersonPhone: yup.string().nullable().trim().length(10),
  securityClearance: yup
    .string()
    .required("Security Clearance Level is required"),
});
