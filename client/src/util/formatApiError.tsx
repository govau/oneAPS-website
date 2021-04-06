import React from "react";
import { IApiFormError } from "../types/types";

export const formatApiError = (errors: IApiFormError[]) => {
  if (errors.length < 2) {
    const { message, path } = errors[0];
    if (errors[0].path === "api") {
      return <p>{message}</p>;
    }
    return (
      <div>
        <a href={`#${path}`}>
          {path.toLocaleUpperCase()}: {message}
        </a>
      </div>
    );
  }
  return errors.map((error, index: number) => (
    <li key={index}>
      <a href={`#${error.path}`}>
        {error.path.toLocaleUpperCase()}: {error.message}
      </a>
    </li>
  ));
};
