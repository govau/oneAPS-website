import { useState, useEffect, useContext } from 'react';
import { getUser, emailVerification, resendEmailVerification } from '../services';
import { UserContext } from '../context';
import { IEmailVerificationType, IApiFormError } from '../types';

const processErrors = (e) => {
  let errors = [];
  if (e.response.status === 400) {
    for (const property in e.response.data.errors) {
      for (const message of e.response.data.errors[property]) {
        errors.push({
          message,
          path: property,
        });
      }
    }
    return errors;
  }
}

export const useUserHook = () => {
  const [errors, setErrors] = useState<IApiFormError[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [data, setData] = useState();
  const user = useContext(UserContext);
  
  const getUserFn = async () => {
    try {
      setData(undefined);
      if (user.user.userId)  {
        var result = await getUser(user.user.userId, user.token);
        setData(result.data);
      }
    } catch { }
  };
  const logout = () => {
    user.updateToken();
  }
  const verifyEmail = async (formData: IEmailVerificationType) => {
    setSaving(true);
    try {
      formData.userId = user.user.userId;
      var result = await emailVerification(formData, user.token);
      setSaving(false);
      return true;
    } catch(e) {
      setErrors(processErrors(e));
    }
    setSaving(false);
    return false;
  }
  const resendVerifyEmail = async () => {
    setSending(true);
    try {
      var result = await resendEmailVerification(user.token);
      setSending(false);
      return true;
    } catch(e) {
      setErrors(processErrors(e));
    }
    setSending(false);
    return false;
  }
  return {
      getUserFn,
      logout,
      verifyEmail,
      resendVerifyEmail,
      user: data,
      loggedIn: user.token ? true : false,
      token: user.token,
      errors,
      saving,
      sending,
      
    };
};
