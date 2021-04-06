import React from "react";
import PageAlert from "./pageAlert";

interface Props {
  errors: Object;
}

const ClientPageErrors: React.FC<Props> = ({ errors }) => {
  return (
    <PageAlert type="error" className="max-42">
      <>
        <h3 tabIndex={0} id="error-heading">
          There has been an error
        </h3>
        <ul>
          {Object.keys(errors).map((error, i: number) => {
            const errorCast = error;
            return (
              <li key={i}>
                <a href={`#${error}`}>{errors[errorCast]}</a>
              </li>
            );
          })}
        </ul>
      </>
    </PageAlert>
  );
};

export default ClientPageErrors;
