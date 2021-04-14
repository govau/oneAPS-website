import axios from "axios";
import { IOpportunityResponseType } from 'types';


export const upsertOpportunityResponse = async (data: IOpportunityResponseType, token: string) => {
  const result = await axios.post(`/api/OpportunityResponse`,
  data, {
    headers: {
      Authorization: `bearer ${token}`,
    }
  });
  return result.data as IOpportunityResponseType;
}

export const loadOpportunityResponse = async (id: number, token: string) => {
  const result = await axios.get(`/api/OpportunityResponse/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    }
  });
  const data = result.data as IOpportunityResponseType;
  return data;
}

export const loadOpportunityResponses = async (token: string) => {
  const result = await axios.get(`/api/OpportunityResponse`, {
    headers: {
      Authorization: `bearer ${token}`,
    }
  });
  const data = result.data as IOpportunityResponseType[];
  return data;
}