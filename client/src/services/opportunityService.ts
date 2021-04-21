import axios from "axios";
import { IOpportunityType } from '../types';


export const loadOpportunity = async (opportunityId: number, token?: string) => {
  let url = `/api/Opportunity/${opportunityId}`;
  let headers = {};
  if (token) {
    url = `/api/auth/Opportunity/${opportunityId}`;
    headers = {
      Authorization: `bearer ${token}`
    };
  }
  const result = await axios.get(url, {
    headers
  });
  const data = result.data as IOpportunityType;
  return data;
}

export const loadOpportunities = async (token?: string) => {
  let url = `/api/Opportunity`;
  let headers = {};
  if (token) {
    url = `/api/auth/Opportunity`;
    headers = {
      Authorization: `bearer ${token}`
    };
  }
  const result = await axios.get(url, {
    headers
  });
  const data = result.data as IOpportunityType[];
  return data;
}

export const createOpporunity = async (formData: IOpportunityType, token: string) => {
  formData.numberOfPeople = `${formData.numberOfPeople}`;
  const result = await axios.post(
    `/api/auth/Opportunity`, formData, {
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
    `/api/auth/Opportunity/${formData.id}`,
    formData, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
  return result;
}