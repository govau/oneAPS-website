import { useState, useEffect, useContext } from 'react';
import { claimToken, getUser } from '../services';
import { UserContext } from '../context';

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

export const useUserHook = () => {
  const [data, setData] = useState();
  const user = useContext(UserContext);
  
  const getUserFn = async () => {
    var result = await getUser(user.user.userId, user.token);
    setData(result.data);
  };
  return {
      getUserFn,
      user: data,
      loggedIn: user.token ? true : false,
      token: user.token
    };
};
