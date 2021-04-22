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
            <div className="col-md-1">Name</div>
            <div className="col-md-10">{user.name}</div>
          </div>
          <div className="row">
            <div className="col-md-1">Email</div>
            <div className="col-md-10">{user.emailAddress}</div>
          </div>
          <div className="row">
            <div className="col-md-1">Phone</div>
            <div className="col-md-10">{user.mobile}</div>
          </div>
          <div className="row">
            <div className="col-md-1">Agency</div>
            <div className="col-md-10">{getText(user.agency)}</div>
          </div>
        </>
      )}
    </>
  );
}
