import React, { useState } from "react";
import { Aubtn } from "../../../types/auds";
import TextField from "./TextField";

interface PasswordFieldProps {
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

const PasswordField: React.FC<PasswordFieldProps> = (
  props: PasswordFieldProps
) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <TextField
      id={props.id}
      type={showPassword ? "text" : "password"}
      hint={props.hint}
      width={props.width}
      label={props.label}
      required={props.required}
    >
      <Aubtn
        as="tertiary"
        type="button"
        aria-label={
          !showPassword
            ? "Hear Password as you type. Note: the password will be visible on the screen"
            : "Hide password"
        }
        aria-pressed={!showPassword ? false : true}
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        {!showPassword ? "show" : "hide"}
        <span className="au-sr-only">password</span>
      </Aubtn>
    </TextField>
  );
};

export default PasswordField;
