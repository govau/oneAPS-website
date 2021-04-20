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

export const createOpporunity = async (formData: IOpportunityType, token: string) => {
  const result = await axios.post(
    `/api/Opportunity`, formData, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
  return result;
}

export const updateOpporunity = async (formData: IOpportunityType, token: string) => {
  formData.numberOfPeople = `${formData.numberOfPeople}`;
  const result = await axios.put(
    `/api/Opportunity/${formData.id}`,
    formData, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
  return result;
}