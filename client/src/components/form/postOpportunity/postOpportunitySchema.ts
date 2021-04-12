import * as yup from "yup";
import { emailValidation } from "../../../util/yup";

export const initialValues = {
  id: "",
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
  agency: "",
  contactPersonName: "",
  contactPersonEmail: "",
  contactPersonPhone: "",
  securityClearance: "",
};

export const validationSchema = yup.object().shape({
  id: yup.string(),
  jobTitle: yup.string().required("Opportunity name is required"),
  jobDescription: yup.string().required("What You'll Do is required"),
  whatYoullGain: yup.string().required("What You'll Gain is required"),
  aboutTeam: yup.string().required("About Your Team is required"),
  numberOfPeople: yup.number().required("Number of people must be >= 1").min(1),
  location: yup.string().required("Location is required"),
  skills: yup.string().required("Skills is required"),
  additionalInfo: yup.string(),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup.date().required("End Date is required"),
  commitmentTime: yup.string().required("Commitment Time is required"),
  agency: yup
    .string()
    .trim()
    .required("Agency/Department name is required")
    .min(2, "Enter a valid agency"),
  contactPersonName: yup.string().required("Contact Person Name is required"),
  contactPersonEmail: emailValidation,
  contactPersonPhone: yup
    .string()
    .trim()
    .required("Mobile number is required")
    .length(10),
  securityClearance: yup
    .string()
    .required("Security Clearance Level is required"),
});
