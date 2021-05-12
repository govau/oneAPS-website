import axios from "axios";
import { IOpportunityResponseType, IOpportunityType } from '../types';


export const loadOpportunityResponses = async (opportunityId: number, token?: string) => {
  const url = `/api/auth/Opportunity/${opportunityId}/responses`;

  const result = await axios.get(url, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
  return result.data as IOpportunityResponseType[];
}


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

export const loadOpportunities = async (search?: string, token?: string, mine?: boolean) => {
  let url = `/api/Opportunity`;
  let headers = {};
  if (token) {
    url = `/api/auth/Opportunity`;
    if (mine) {
      url += '/my'
    }
    headers = {
      Authorization: `bearer ${token}`
    };
  }
  let params = {}
  if (search) {
    params = {
      search
    }
  }
  const result = await axios.get(url, {
    headers,
    params
  });
  const data = result.data as IOpportunityType[];
  return data;
}

export const createOpportunity = async (formData: IOpportunityType, token: string) => {
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

export const updateOpportunity = async (formData: IOpportunityType, token: string) => {
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

export const publishOpportunity = async (formData: IOpportunityType, token: string) => {
  formData.numberOfPeople = `${formData.numberOfPeople}`;
  const result = await axios.put(
    `/api/auth/Opportunity/${formData.id}/publish`,
    formData, {
    headers: {
      Authorization: `bearer ${token}`
    }
  }
  );
  return result;
}

export const closeOpportunity = async (id: number, token: string) => {
  const result = await axios.put(
    `/api/auth/Opportunity/${id}/close`,
    undefined, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );
  return result;
}