import { useState, useEffect } from 'react';
import { loadLookup, lookupType } from '../services';

export const useLookupHook = (name: lookupType, label?: string) => {
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
      let data = result.data;
      if (label) {
        data = [{ text: `Please select ${label}`, value: null }].concat(result.data);
      }
      setLookupData({
        loaded: true,
        data,
      });
    };
    load();
  }, []);

  const getText = (value: string) => {
    if (!lookupData.loaded) {
      return 'loading';
    }
    const lookup = lookupData.data.find(i => i.value === value);
    if (lookup) {
      return lookup.text;
    } else {
      return `cannout find "${value}"`;
    }
  }
  return {
    getText,
    lookupData
  };
};
