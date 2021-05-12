import { Link } from "gatsby";
import React, { useContext, useEffect } from "react";
import {DateTime } from 'luxon';
import { useOpportunitiesHook } from '../../hooks';
import { Aubtn as a } from "../../types/auds";

export const MyOpportunities: React.FC = () => {
  const { loadMyOpportunitiesFn, closeOpporunityFn, data } = useOpportunitiesHook();

  useEffect(() => {
    loadMyOpportunitiesFn();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h2>My opportunities</h2>
        </div>
      </div>
      <table className="au-table">
        <thead className="au-table__head">
          <tr className="au-table__row">
            <th scope="col" className="au-table__header au-table__header--width-50">Title</th>
            <th scope="col" className="au-table__header">Start date</th>
            <th scope="col" className="au-table__header">End date</th>
            <th scope="col" className="au-table__header">Closed at</th>
            <th scope="col" className="au-table__header au-table__header--numeric">Responses</th>
            <th scope="col" className="au-table__header au-table__header--width-15">Actions</th>
          </tr>
        </thead>
        <tbody className="au-table__body">
          {data && data.map(d => (
            <tr className="au-table__row">
              <td className="au-table__cell"><Link to={`/opportunity/detail/?opportunityId=${d.id}`}>{d.jobTitle}</Link></td>
              <td className="au-table__cell">{DateTime.fromISO(d.startDate).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}</td>
              <td className="au-table__cell">{DateTime.fromISO(d.endDate).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}</td>
              <td className="au-table__cell">{d.closedAt && DateTime.fromISO(d.closedAt).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}</td>
              <td className="au-table__cell au-table__cell--numeric">{d.numberOfResponses > 0 && d.numberOfResponses}</td>
              <td className="au-table__cell">
                {d.numberOfResponses > 0 && <><Link to={`/opportunity-responses/?opportunityId=${d.id}`}>View Applications</Link><br/></>}
                {d.canModify && <><Link to={`/post-opportunity/?opportunityId=${d.id}`}>Edit Opportunity</Link><br/></>}
                {!d.closedAt && <a href="" onClick={async (e) => {
                  e.preventDefault();
                  closeOpporunityFn(d.id);
                }}>Close Opportunity</a>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
