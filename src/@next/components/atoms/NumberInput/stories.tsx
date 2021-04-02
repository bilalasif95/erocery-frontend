import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { NumberInput } from ".";

storiesOf("@components/atoms/NumberInput", module)
  .addParameters({ component: NumberInput })
  .add("default", () => <NumberInput value="" label="Empty" />)
  .add("with value", () => (
    <NumberInput
      label="Text goes here"
      value={text("value", "Example text")}
      contentRight={<div>Content right</div>}
    />
  ))
  .add("error", () => <NumberInput value="Some text" label="Text goes here" error />)
  .add("disabled", () => <NumberInput value="" label="Text goes here" disabled />);
