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

export const updateOpportunityResponse = async (toSave: IOpportunityResponseType, token: string) => {
  const result = await axios.put(`/api/OpportunityResponse/${toSave.id}`,
  toSave, {
    headers: {
      Authorization: `bearer ${token}`,
    }
  });
  return result.data as IOpportunityResponseType;
}

export const applyOpportunityResponse = async (toSave: IOpportunityResponseType, token: string) => {
  const result = await axios.put(`/api/OpportunityResponse/${toSave.id}/apply`,
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

export const uploadFile = async (id: number, toSave: FormData, token: string) => {
  const result = await axios.post(`/api/OpportunityResponse/${id}/fileupload`,
  toSave, {
    headers: {
      Authorization: `bearer ${token}`,
    }
  });
  return result.data as IOpportunityResponseType;
}


export const downloadFile = async (id: number, filename: string, token: string) => {
  const result = await axios.get(`/api/opportunityresponse/${id}/download?filename=${filename}`, {
    responseType: 'blob',
    headers: {
      Authorization: `bearer ${token}`,
    }
  });
  return new Blob([result.data]);
}