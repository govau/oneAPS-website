import { Link, navigate } from "gatsby";
import React, { useEffect } from "react";
import { DateTime } from 'luxon';
import { useOpportunityResponseHook } from '../../hooks';
import { Aubtn } from "../../types/auds";

export const OpportunityResponsesList: React.FC<{ opportunityId: number }> = ({ opportunityId }) => {
  const { loadResponsesFn, list, downloadFileFn } = useOpportunityResponseHook();

  useEffect(() => {
    if (opportunityId) {
      loadResponsesFn(opportunityId);
    } else {
      navigate('/dashboard');
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
            <Link to="/dashboard">My profile</Link>
          </li>
          <li>Opportunity applications</li>
        </ul>
      </nav>
      <h1>Opportunity applications</h1>
      <div style={{ marginTop: '2em' }}>
        <table className="au-table">
          <thead className="au-table__head">
            <tr className="au-table__row">
              <th scope="col" className="au-table__header au-table__header--width-10">Name</th>
              <th scope="col" className="au-table__header au-table__header--width-10">Contact</th>
              <th scope="col" className="au-table__header au-table__header--width-50">Why pick me</th>
              <th scope="col" className="au-table__header au-table__header--width-10">Submitted at</th>
              <th scope="col" className="au-table__header au-table__header--width-10">Actions</th>
            </tr>
          </thead>
          <tbody className="au-table__body">
            {list && list.map(d => (
              <tr className="au-table__row">
                <td className="au-table__cell">{d.user.name}</td>
                <td className="au-table__cell">{d.user.emailAddress}<br/>{d.user.mobile}</td>
                <td className="au-table__cell"><span style={{ whiteSpace: 'pre-wrap' }}>{d.whyPickMe}</span></td>

                <td className="au-table__cell">{d.submittedAt && DateTime.fromISO(d.submittedAt).setLocale('en-au').toLocaleString(DateTime.DATE_SHORT)}</td>

                <td className="au-table__cell">
                  {d.resumeLink && <><a target="_blank" href={d.resumeLink}>Public profile</a><br/></>}
                  {d.resumeUpload &&
                    <a href="" onClick={async (e) => {
                      e.preventDefault();
                      var response = await downloadFileFn(d.id, d.resumeUpload);
                      const url = window.URL.createObjectURL(response);
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', d.resumeUpload);
                      document.body.appendChild(link);
                      link.click();
                    }}>Resume</a>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
