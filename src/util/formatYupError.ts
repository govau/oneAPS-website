import { ValidationError } from "yup";

//Takes errors from Yup validation schema and returns them in an array
export const formatYupError = (errors: ValidationError) => {
  const errorArray: Array<{ path: String | undefined; message: String }> = [];

  errors.inner.forEach((error) => {
    const messageExists = errorArray.some((e) => e.path === error.path);
    if (!messageExists) {
      errorArray.push({
        path: error.path,
        message: error.message,
      });
    }
  });

  return errorArray;
};
