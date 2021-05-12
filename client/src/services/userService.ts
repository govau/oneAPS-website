import axios from "axios";
import { IEmailVerificationType } from "../types";


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

export const emailVerification = async (emailVerification: IEmailVerificationType, token: string) => {
  const result = await axios.post(
    `/api/User/verify`,
    emailVerification, {
    headers: {
      Authorization: `bearer ${token}`,
    }
  });
  return result;
}

export const resendEmailVerification = async (token: string) => {
  const result = await axios.post(
    `/api/User/resend`,
    undefined, {
    headers: {
      Authorization: `bearer ${token}`,
    }
  });
  return result;
}