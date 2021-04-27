import { navigate, Link } from "gatsby";
import React, { useEffect } from "react";
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
    <>
      <nav className="au-breadcrumbs" aria-label="breadcrumb">
        <ul className="au-link-list au-link-list--inline">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            My profile
          </li>
        </ul>
      </nav>
      <h1>My profile</h1>
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
    </>
  );
}
