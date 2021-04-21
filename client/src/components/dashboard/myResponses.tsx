import { Link } from "gatsby";
import React, { useContext, useEffect } from "react";
import {DateTime } from 'luxon';
import { useLoadOpportunityResponseHook } from '../../hooks';

export const MyResponses: React.FC = () => {
  const { loadMyListFn, data } = useLoadOpportunityResponseHook();

  useEffect(() => {
    loadMyListFn();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h2>My applications</h2>
        </div>
      </div>
      <table className="au-table">
        <thead className="au-table__head">
          <tr className="au-table__row">
            <th scope="col" className="au-table__header au-table__header--width-30">Title</th>
            <th scope="col" className="au-table__header au-table__header--width-20">Submitted at</th>
            <th scope="col" className="au-table__header au-table__header--width-20">Withdrawn at</th>
            <th scope="col" className="au-table__header au-table__header--width-10">Actions</th>
          </tr>
        </thead>
        <tbody className="au-table__body">
          {data && data.map(d => (
            <tr className="au-table__row">
              <td className="au-table__cell"><Link to={`/detailed-opportunity/?opportunityId=${d.opportunityId}`}>{d.opportunity.jobTitle}</Link></td>
              <td className="au-table__cell">{d.submittedAt && DateTime.fromISO(d.submittedAt).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}</td>
              <td className="au-table__cell">{d.withdrawnAt && DateTime.fromISO(d.withdrawnAt).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}</td>
              <td className="au-table__cell">
                {!d.submittedAt || !d.withdrawnAt && <Link to={`/opportunity-response/?opportunityId=${d.id}`}>Edit</Link>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
