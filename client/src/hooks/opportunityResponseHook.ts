import { useContext, useState, useEffect } from 'react';
import { upsertOpportunityResponse } from '../services';
import { IOpportunityResponseType, IApiFormError } from '../types';
import { UserContext } from '../context';


export const useUpsertOpportunityResponseHook = () => {
  const [data, setData] = useState<IOpportunityResponseType>();
  const [errors, setErrors] = useState<IApiFormError[]>();
  const user = useContext(UserContext);
  const save = async (toSave: IOpportunityResponseType) => {
    toSave.userId = user.user.userId;
    let errors: IApiFormError[] = [];
    try {
      const result = await upsertOpportunityResponse(toSave, user.token);
      setData(result);
      return true;
    } catch (e) {
      if (e.response.status === 400) {
        for (const property in e.response.data.errors) {
          for (const message of e.response.data.errors[property]) {
            errors.push({
              message,
              path: property,
            });
          }
        }
        setErrors(errors);
      }
      return false;
    }
  };
  return {saveFn: save, updatedData: data, errors};
};