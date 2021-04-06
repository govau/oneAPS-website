import { useField } from "formik";
import React from "react";
import {
  AuErrorText,
  AuFieldset,
  AuFormGroup,
  AuHintText,
  AuLabel,
  AuLegend,
  AuRadio,
} from "../../../types/auds";

type Option = {
  label: string;
  value: string;
  className?: string;
  defaultChecked?: boolean;
  block?: boolean;
};

interface RadioGroupProps {
  legend: string;
  id: string;
  required?: boolean;
  defaultValue?: string;
  hint?: string;
  onChange?: (e: any) => void;
  className?: string;
  options: Array<Option>;
}

const RadioGroup: React.FC<RadioGroupProps> = (props: RadioGroupProps) => {
  const [field, meta] = useField({ name: props.id, ...props });
  const error = meta.error && meta.touched ? true : false;
  return (
    <AuFormGroup status={error ? "invalid" : "valid"}>
      <AuFieldset>
        <AuLegend>
          <AuLabel dangerouslySetInnerHTML={{ __html: props.legend }}></AuLabel>
          {props.hint && <AuHintText text={props.hint} />}
          {error && <AuErrorText text={meta.error} id={`${props.id}--error`} />}
        </AuLegend>

        {props.options.map((option, i) => {
          return (
            <AuRadio
              {...option}
              name="id"
              id={`radio-${option.value}`}
              key={i}
            />
          );
        })}
      </AuFieldset>
    </AuFormGroup>
  );
};

export default RadioGroup;
