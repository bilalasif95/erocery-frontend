import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

import { ErrorMessage, NumberInput} from "@components/atoms";

export const NumberField: React.FC<IProps> = ({
  errors,
  helpText,
  ...rest
}: IProps) => {
  const hasErrors = !!(errors && errors.length);

  return (
    <>
      <S.NumberField>
        <NumberInput{...rest} error={hasErrors} />
        <S.ErrorMessages>
          <ErrorMessage errors={errors} />
          {helpText && <S.HelpText>{helpText}</S.HelpText>}
        </S.ErrorMessages>
      </S.NumberField>
    </>
  );
};
