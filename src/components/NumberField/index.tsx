import * as React from "react";

import { FormError } from "../Form";

import "./scss/index.scss";

type Style = "white" | "grey";

interface IClassNameArgs {
  errors?: FormError[];
  iconLeft?: React.ReactNode;
  styleType?: Style;
}

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: FormError[];
  helpText?: string;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  styleType?: Style;
}

const generateClassName = ({ errors, iconLeft, styleType }: IClassNameArgs) => {
  const baseClass = "numinput__field";
  const errorsClass = errors && errors.length ? " numinput__field--error" : "";
  const iconLeftClass = iconLeft ? " numinput__field--left-icon" : "";
  const styleTypeClass = styleType === "grey" ? " numinput__field--grey" : "";

  return baseClass.concat(errorsClass, iconLeftClass, styleTypeClass);
};
const NumberField: React.FC<TextFieldProps> = ({
  label = "",
  iconLeft,
  iconRight,
  errors,
  helpText,
  styleType = "white" as Style,
  ...rest
}) => (
  <div className="numinput">
    {iconLeft ? <span className="numinput__icon-left">{iconLeft}</span> : null}
    {iconRight ? <span className="numinput__icon-right">{iconRight}</span> : null}
    <div className="numinput__content">
      <div className="numinput__startnumber">03</div>
      <input
        {...rest}
        className={generateClassName({ errors, iconLeft, styleType })}
      />
      {label ? <span className="numinput__label">{label}</span> : null}
    </div>
    {errors && (
      <span className="numinput__error">
        {errors.map(error => error.message).join(" ")}
      </span>
    )}
    {helpText && <span className="numinput__help-text">{helpText}</span>}
  </div>
);

export default NumberField;
