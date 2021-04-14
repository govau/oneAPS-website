import { useState, useEffect } from 'react';
import { loadOpportunity, loadOpportunities } from 'services';
import { IOpportunityType } from 'types';

export const useOpportunityHook = (id: number) => {
  const [data, setData] = useState<IOpportunityType>();

  useEffect(() => {
    const load = async () => {
      const result = await loadOpportunity(id);
      setData(result);
    };
    load();
  }, []);
  return data;
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
