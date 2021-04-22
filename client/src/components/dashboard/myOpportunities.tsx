import { Link } from "gatsby";
import React, { useContext, useEffect } from "react";
import {DateTime } from 'luxon';
import { UserContext } from "../../context/UserContext";
import { useOpportunitiesHook } from '../../hooks';

export const MyOpportunities: React.FC = () => {
  const { loadMyOpportunitiesFn, data } = useOpportunitiesHook();

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
            <th scope="col" className="au-table__header au-table__header--width-40">Title</th>
            <th scope="col" className="au-table__header au-table__header--width-15">Start date</th>
            <th scope="col" className="au-table__header au-table__header--width-15">End date</th>
            <th scope="col" className="au-table__header au-table__header--width-15 au-table__header--numeric">Responses</th>
            <th scope="col" className="au-table__header au-table__header--width-15">Actions</th>
          </tr>
        </thead>
        <tbody className="au-table__body">
          {data && data.map(d => (
            <tr className="au-table__row">
              <td className="au-table__cell"><Link to={`/detailed-opportunity/?opportunityId=${d.id}`}>{d.jobTitle}</Link></td>
              <td className="au-table__cell">{DateTime.fromISO(d.startDate).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}</td>
              <td className="au-table__cell">{DateTime.fromISO(d.endDate).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}</td>
              <td className="au-table__cell au-table__cell--numeric">{d.numberOfResponses}</td>
              <td className="au-table__cell">
                <Link to={`/opportunity-responses/?opportunityId=${d.id}`}>View Applications</Link><br/>
                <Link to={`/post-opportunity/?opportunityId=${d.id}&title=${encodeURIComponent(d.jobTitle)}`}>Edit Opportunity</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
