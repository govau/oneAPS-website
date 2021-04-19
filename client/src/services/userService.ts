import axios from "axios";


export const claimToken = async (token: string) => {
  const result = await axios.post(`/api/User/claim`, undefined, {
    params: {
      'token': token
    }
  });
}