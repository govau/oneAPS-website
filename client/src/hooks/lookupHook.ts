import { useState, useEffect } from 'react';
import { loadLookup, lookupType } from '../services';

export const useLookupHook = (name: lookupType, label: string) => {
  const [lookupData, setLookupData] = useState<{
    data: {
      text: string,
      value: string,
    }[],
    loaded: boolean,
  }>({
    loaded: false,
    data: [],
  });

  useEffect(() => {
    if (lookupData.loaded) {
      return;
    }
    const load = async () => {
      const result = await loadLookup(name);
      const data = [{ text: `Please select ${label}`, value: null }].concat(result.data);
      setLookupData({
        loaded: true,
        data,
      });
    };
    load();
  }, []);
  return lookupData;
};
