import axios from "axios";
import { IEmailVerificationType, IVerifyResetPasswordType, IResetPasswordType } from "../types";

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

export const verifyResetPassword = async (data: IVerifyResetPasswordType) => {
  const result = await axios.post(
    `/api/User/resetPassword/verify`,
    data
  );
  return result;
}

export const resetPassword = async (data: IResetPasswordType) => {
  const result = await axios.post(
    `/api/User/resetPassword`,
    data
  );
  return result;
}