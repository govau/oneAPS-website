import { Link } from "gatsby";
import React, { useContext, useEffect } from "react";
import {DateTime } from 'luxon';
import { useOpportunityResponseHook } from '../../hooks';

export const MyResponses: React.FC = () => {
  const { loadMyResponsesFn, list, withdrawFn } = useOpportunityResponseHook();

  useEffect(() => {
    loadMyResponsesFn();
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
            <th scope="col" className="au-table__header au-table__header--width-50">Title</th>
            <th scope="col" className="au-table__header">Submitted at</th>
            <th scope="col" className="au-table__header">Withdrawn at</th>
            <th scope="col" className="au-table__header au-table__header--width-20">Actions</th>
          </tr>
        </thead>
        <tbody className="au-table__body">
          {list && list.map(d => (
            <tr className="au-table__row">
              <td className="au-table__cell"><Link to={`/detailed-opportunity/?opportunityId=${d.opportunityId}`}>{d.opportunity.jobTitle}</Link></td>
              <td className="au-table__cell">{d.submittedAt && DateTime.fromISO(d.submittedAt).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}</td>
              <td className="au-table__cell">{d.withdrawnAt && DateTime.fromISO(d.withdrawnAt).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}</td>
              <td className="au-table__cell">
                {!d.submittedAt && !d.withdrawnAt && <><Link to={`/opportunity-response/?opportunityId=${d.opportunityId}`}>Edit</Link><br/></>}
                {d.submittedAt && !d.withdrawnAt && 
                  <>
                    <Link to={`/opportunity-response-view/?opportunityResponseId=${d.id}`}>View</Link><br/>
                    <a href="" onClick={async (e) => {
                        e.preventDefault();
                        await withdrawFn(d.id);
                        await loadMyResponsesFn();
                      }}>Withdraw</a>
                  </>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
