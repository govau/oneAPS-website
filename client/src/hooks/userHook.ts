import { useState, useEffect } from 'react';
import { claimToken } from '../services';

export const useClaimHook = (token: string) => {
  const [claim, setClaim] = useState(false);
  const [errors, setErrors] = useState<string>();
  useEffect(() => {
    const claim = async () => {
      try {
        await claimToken(token);
      } catch (e) {
        if (e.response.status === 409) {
          setErrors('Token has already been claimed');
        }
      }
      setClaim(true);
    };
    claim();
  }, []);
  return { claim, errors };
};
