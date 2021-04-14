import axios from "axios";
import { useContext } from 'react';
import { IOpportunityResponseType } from '../types';

export const createOpportunityResponse = async (toSave: IOpportunityResponseType, token: string) => {
  const result = await axios.post(`/api/OpportunityResponse`,
  toSave, {
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
