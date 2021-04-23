import { Link, navigate } from "gatsby";
import React, { useEffect } from "react";
import { DateTime } from 'luxon';
import { useLoadOpportunityResponseHook, useOpportunityResponseOperationsHook } from '../../hooks';
import {
  Aubtn,
  AuFieldset,
  AuFormGroup,
  AuLabel
} from "../../types/auds";

export const OpportunityResponsesList: React.FC<{ opportunityId: number }> = ({ opportunityId }) => {
  const { loadResponsesFn, list } = useLoadOpportunityResponseHook();
  const { downloadFileFn } = useOpportunityResponseOperationsHook();

  useEffect(() => {
    if (opportunityId) {
      loadResponsesFn(opportunityId);
    } else {
      navigate('/dashboard');
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h2>Opportunity applications</h2>
        </div>
      </div>
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
                  {d.resumeLink && <><a href={d.resumeLink}>Public profile</a><br/></>}
                  {d.resumeUpload &&
                    <Aubtn type="button" as="tertiary" onClick={async () => {
                      var response = await downloadFileFn(d.id, d.resumeUpload);
                      const url = window.URL.createObjectURL(response);
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', d.resumeUpload);
                      document.body.appendChild(link);
                      link.click();
                    }}>Resume</Aubtn>
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
