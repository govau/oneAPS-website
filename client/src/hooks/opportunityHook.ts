import { useState, useEffect, useContext } from 'react';
import { loadOpportunity, loadOpportunities, createOpporunity, updateOpporunity } from '../services';
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

  const clearFn = () => {
    setData(undefined);
  };

  const loadFn = async (id: number) => {
    const result = await loadOpportunity(id, user.token);
    setData(result);
  };

  const createOpporunityFn = async (formData: IOpportunityType): Promise<{data?: IOpportunityType, success: boolean}> => {
    setSaving(true);
    try {
      var result = await createOpporunity(formData, user.token);
      setData(result.data);
      return {
        data: result.data,
        success: true
      };
    } catch (e) {
      setErrors(processErrors(e));
    }
    setSaving(false);
    return {
      success: false
    };
  };

  const updateOpporunityFn = async (formData: IOpportunityType): Promise<{data?: IOpportunityType, success: boolean}> => {
    setSaving(true);
    try {
      var result = await updateOpporunity(formData, user.token);
      setData(result.data);
      return {
        data: result.data,
        success: true
      };
    } catch (e) {
      setErrors(processErrors(e));
    }
    setSaving(false);
    return {
      success: false
    };
  };

  return {
    clearFn,
    loadFn,
    createOpporunityFn,
    updateOpporunityFn,
    data,
    saving,
    errors
  }
};

export const useOpportunitiesHook = () => {
  const [data, setData] = useState<IOpportunityType[]>();
  const user = useContext(UserContext);

  const loadFn = async (search?: string) => {
    const result = await loadOpportunities(search, user.token);
    setData(result);
  };

  const loadMyListFn = async () => {
    const result = await loadOpportunities(undefined, user.token, true);
    setData(result);
  };
  return {
    loadFn,
    loadMyListFn,
    data
  };
};
