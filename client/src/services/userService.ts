import axios from "axios";


export const claimToken = async (token: string) => {
  const result = await axios.post(`/api/User/claim`, undefined, {
    params: {
      'token': token
    }
  });
}
export const getUser = async (id: number, token: string) => {
  const result = await axios.get(`/api/User/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    }
  });
  return result;
}