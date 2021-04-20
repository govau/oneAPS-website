import { useState, useEffect, useContext } from 'react';
import { loadOpportunity, loadOpportunities, postOpporunity } from '../services';
import { IOpportunityType, IApiFormError } from '../types';
import { UserContext } from '../context';


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

export const useOpportunityHook = () => {
  const [data, setData] = useState<IOpportunityType>();
  const [saving, setSaving] = useState<boolean>(false);
  const [errors, setErrors] = useState<IApiFormError[]>();
  const user = useContext(UserContext);

  const loadFn = async (id: number) => {
    const result = await loadOpportunity(id);
    setData(result);
  };

  const postOpporunityFn = async (formData: IOpportunityType) => {
    setSaving(true);
    try {
      await postOpporunity(formData, user.token);
      return true;
    } catch (e) {
      setErrors(processErrors(e));
    }
    setSaving(false);
    return false;
  };

  return {
    loadFn,
    postOpporunityFn,
    data,
    saving,
    errors
  }
};

export const useOpportunitiesHook = () => {
  const [data, setData] = useState<IOpportunityType[]>();

  useEffect(() => {
    const load = async () => {
      const result = await loadOpportunities();
      setData(result);
    };
    load();
  }, []);
  return data;
};
