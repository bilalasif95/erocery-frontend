import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Input } from "@components/atoms";
import { NumberField } from ".";
import * as S from "./styles";
import { IProps } from "./types";

describe("<NumberField />", () => {
  const DEFAULT_PROPS = {
    errors: [],
    label: "Label",
    value: "Value",
  };

  const renderNumberField = (props: IProps) => shallow(<NumberField {...props} />);

  it("exists", () => {
    const NumberField = renderNumberField(DEFAULT_PROPS);

    expect(NumberField.exists()).toEqual(true);
  });

  it("should pass `[error, label, value]` props to <Input />", () => {
    const input = renderNumberField(DEFAULT_PROPS).find(Input);

    expect(input.exists()).toBe(true);
    expect(input.prop("label")).toEqual(DEFAULT_PROPS.label);
    expect(input.prop("value")).toEqual(DEFAULT_PROPS.value);
    expect(input.prop("error")).toEqual(false);
  });

  it("should pass `contentLeft` and `contentRight` props to <Input />", () => {
    const CONTENT_LEFT = () => <div />;
    const CONTENT_RIGHT = () => <span />;

    const input = renderNumberField({
      ...DEFAULT_PROPS,
      contentLeft: CONTENT_LEFT,
      contentRight: CONTENT_RIGHT,
    }).find(Input);

    expect(input.prop("contentLeft")).toEqual(CONTENT_LEFT);
    expect(input.prop("contentRight")).toEqual(CONTENT_RIGHT);
  });

  it("should pass `error` prop to <Input /> as true if `errors` is not empty", () => {
    const ERRORS = [
      {
        field: "field",
        message: "message",
      },
    ];
    const input = renderNumberField({ ...DEFAULT_PROPS, errors: ERRORS }).find(
      Input
    );

    expect(input.prop("error")).toEqual(true);
  });

  it("should render <S.HelpText> if `helpText` prop is provided", () => {
    const HELP_TEXT = "Some info text";
    const help = renderNumberField({
      ...DEFAULT_PROPS,
      helpText: HELP_TEXT,
    }).find(S.HelpText);

    expect(help.exists()).toBe(true);
    expect(help.text()).toEqual(HELP_TEXT);
  });
});
