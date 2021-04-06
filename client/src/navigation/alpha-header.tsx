import React from "react";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const AlphaHeader: React.FC<Props> = () => {
  return (
    <div className="au-body" id="alpha-banner">
      <div className="container-fluid">
        <span className="alpha-pill">Alpha</span>
        <span>
          This prototype is not complete and has limited functionality.
        </span>
      </div>
    </div>
  );
};
