import axios from "axios";

export type lookupType = 'agency' | 'opportunitystatus' | 'skills' | 'securityclearance';

export const loadLookup = async (name: lookupType) => {
  return await axios.get(`/api/lookup`, {
    params: {
      name,
    },
  });
}