import { Link } from "gatsby";
import React, { useEffect } from "react";
import { useUserHook, useLookupHook } from '../../hooks';

export const MyDetails: React.FC = () => {
  const { getUserFn, user } = useUserHook();
  const { getText } = useLookupHook('agency');

  useEffect(() => {
    getUserFn();
  }, []);

  return (
    <>
      <div className="row" style={{ marginBottom: '1em' }}>
        <div className="col-md-12">
          <h2>My details</h2>
        </div>
      </div>
      {user && (
        <>
          <div className="row">
            <div className="col-md-2">Name</div>
            <div className="col-md-10">{user.name}</div>
          </div>
          <div className="row">
            <div className="col-md-2">Email</div>
            <div className="col-md-10">{user.emailAddress}</div>
          </div>
          <div className="row">
            <div className="col-md-2">Phone</div>
            <div className="col-md-10">{user.mobile}</div>
          </div>
          <div className="row">
            <div className="col-md-2">Agency</div>
            <div className="col-md-10">{getText(user.agency)}</div>
          </div>
          <div className="row">
            <div className="col-md-2">Email verification</div>
            <div className="col-md-10">{user.emailVerified ? 'Your email is verified' :
            <>
              Your email is not verified.  Once you <Link to="/register/verify-email">verify your email</Link> you can post and apply for opportunities.
            </>
            }</div>
          </div>
        </>
      )}
    </>
  );
}
