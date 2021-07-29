import axios from "axios";
import agencies from "../../content/agencies.json";

export type lookupType = 'agency' | 'opportunitystatus' | 'skills' | 'securityclearance';

export const loadLookup = async (name: lookupType) => {
  if (name === 'agency') {
    return Promise.resolve({
      data: agencies
    })
  }

  return await axios.get(`/api/lookup`, {
    params: {
      name,
    },
  });
}