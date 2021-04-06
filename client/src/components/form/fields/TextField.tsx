import React from "react";
import { useField } from "formik";
import {
  AuFormGroup,
  AuLabel,
  AuErrorText,
  AuHintText,
  AuTextInput,
} from "../../../types/auds";

interface TextFieldProps {
  label: string;
  id: string;
  required?: boolean;
  defaultValue?: string;
  hint?: string;
  onChange?: (e: any) => void;
  pattern?: string;
  width?: string;
  as?: string;
  className?: string;
  type?: string;
  dark?: boolean;
  block?: boolean;
  children?: any;
  formGroupClass?: string;
}

const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  const [field, meta] = useField({ name: props.id, ...props });
  const error = meta.touched && meta.error ? meta.error : "";
  const hint = props.hint ? props.hint : "";
  const describedByError: string = error && `${props.id}--error`;
  const describedByHint: string = hint && ` ${props.id}--hint`;

  return (
    <AuFormGroup
      status={error ? "invalid" : "valid"}
      className={`${props.formGroupClass ? props.formGroupClass : ""}`}
    >
      <AuLabel htmlFor={props.id} text={props.label} />
      {error && <AuErrorText text={meta.error} id={`${props.id}--error`} />}
      {hint && <AuHintText text={props.hint} id={`${props.id}--hint`} />}
      <>
        <AuTextInput
          {...field}
          block={props.block}
          id={props.id}
          as={props.as}
          className={`${error ? "au-text-input--invalid" : ""} ${
            props.className
          }`}
          aria-invalid={error}
          type={props.type}
          aria-describedby={describedByError + describedByHint}
          width={props.width}
          name={props.id}
        />
        {props.children}
      </>
    </AuFormGroup>
  );
};

export default TextField;
