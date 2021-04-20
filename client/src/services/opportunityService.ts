import axios from "axios";
import { IOpportunityType } from '../types';


export const loadOpportunity = async (opportunityId: number) => {
  const result = await axios.get(`/api/Opportunity/${opportunityId}`);
  const data = result.data as IOpportunityType;
  return data;
}

export const loadOpportunities = async () => {
  const result = await axios.get(`/api/Opportunity`);
  const data = result.data as IOpportunityType[];
  return data;
}

export const postOpporunity = async (formData: IOpportunityType, token: string) => {
  const {
    id,
    jobTitle,
    jobDescription,
    whatYoullGain,
    aboutTeam,
    numberOfPeople,
    startDate,
    endDate,
    commitmentTime,
    agency,
    contactPersonName,
    contactPersonEmail,
    contactPersonPhone,
    location,
    skills,
    additionalInfo,
    securityClearance,
  } = formData;
  const result = await axios.post(
    `/api/Opportunity`, {
      id,
      jobTitle,
      jobDescription,
      whatYoullGain,
      aboutTeam,
      numberOfPeople: `${numberOfPeople}`,
      startDate,
      endDate,
      commitmentTime,
      agency,
      contactPersonName,
      contactPersonPhone,
      contactPersonEmail,
      location,
      skills,
      additionalInfo,
      securityClearance,
    }, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
  return result;
}