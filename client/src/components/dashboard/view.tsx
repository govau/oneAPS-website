import { navigate } from "gatsby";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useUserHook } from '../../hooks';
import { MyDetails } from './myDetails';
import { MyOpportunities } from './myOpportunities';
import { MyResponses } from './myResponses';

export const View: React.FC = () => {
  const { logout, loggedIn } = useUserHook();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, []);

  return (
    <div className="container">
      <div style={{ marginTop: '3em' }}>
        <MyDetails />

        <button
          style={{ marginTop: '1em' }}
          className="au-btn"
          onClick={(e) => {
            e.preventDefault();
            logout();
            navigate("/");
          }}
        >
          Logout
      </button>
      </div>
      <div style={{ marginTop: '3em' }}>
        <MyOpportunities />
      </div>
      <div style={{ marginTop: '3em' }}>
        <MyResponses />
      </div>
    </div>
  );
}
