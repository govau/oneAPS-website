import axios from "axios";
import { IOpportunityType } from 'types';


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