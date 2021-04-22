import { useContext, useState, useEffect } from 'react';
import { 
  applyOpportunityResponse,
  createOpportunityResponse,
  updateOpportunityResponse,
  loadOpportunityResponse,
  loadOpportunityResponses,
  loadMyResponses,
  uploadFile,
  downloadFile,
 } from '../services';
import { IOpportunityResponseType, IApiFormError } from '../types';
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
export const useOpportunityResponseOperationsHook = () => {
  const [data, setData] = useState<IOpportunityResponseType>();
  const [errors, setErrors] = useState<IApiFormError[]>();
  const user = useContext(UserContext);
  const callService = async(fn, toSave: IOpportunityResponseType) => {
    toSave.userId = user.user.userId;
    try {
      const result = await fn(toSave, user.token);
      setData(result);
      return true;
    } catch (e) {
      setErrors(processErrors(e));
      return false;
    }
  }
  const updateFn = async (toSave: IOpportunityResponseType) => {
    return await callService(updateOpportunityResponse, toSave);
  };
  const createFn = async (toSave: IOpportunityResponseType) => {
    return await callService(createOpportunityResponse, toSave);
  };
  const applyFn = async (toSave: IOpportunityResponseType) => {
    return await callService(applyOpportunityResponse, toSave);
  };
  const uploadFn = async (id: number, toSave: FormData) => {
    try {
      const result = await uploadFile(id, toSave, user.token);
      setData(result);
      return true;
    } catch (e) {
      setErrors(processErrors(e));
      return false;
    }
  };
  const downloadFileFn = async (id: number, filename: string) => {
    return await downloadFile(id, filename, user.token);
  };
  return {applyFn, createFn, updateFn, uploadFn, downloadFileFn, updatedData: data, errors};
};

export const useLoadOpportunityResponseHook = () => {
  const [data, setData] = useState<IOpportunityResponseType>();
  const [list, setList] = useState<IOpportunityResponseType[]>();
  const user = useContext(UserContext);

  const loadFn = async (id: number) => {
    const result = await loadOpportunityResponse(id, user.token);
    setData(result);
  };
  const loadMyResponsesFn = async () => {
    const result = await loadMyResponses(user.token);
    setList(result);
  };


  const loadResponsesFn = async (id: number) => {
    const result = await loadOpportunityResponses(id, user.token);
    setList(result);
  };

  return {
    loadFn,
    loadMyResponsesFn,
    loadResponsesFn,
    data,
    list
  };
};
