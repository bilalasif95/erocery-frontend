import { storiesOf } from "@storybook/react";
import React from "react";

import { action } from "@storybook/addon-actions";
import { NumberField } from ".";

const DEFAULT_PROPS = {
  errors: [],
  label: "Label",
  onChange: action("onChange"),
  value: "Value",
};

const ContentLeft = () => <span>Content Left</span>;
const ContentRight = () => <span>Content Right</span>;

storiesOf("@components/molecules/NumberField", module)
  .addParameters({ component: NumberField })
  .add("default", () => <NumberField {...DEFAULT_PROPS} />)
  .add("with errors", () => (
    <NumberField
      {...DEFAULT_PROPS}
      errors={[{ field: "field", message: "Some error" }]}
    />
  ))
  .add("with content left", () => (
    <NumberField {...DEFAULT_PROPS} contentLeft={<ContentLeft />} />
  ))
  .add("with content right", () => (
    <NumberField {...DEFAULT_PROPS} contentRight={<ContentRight />} />
  ));
