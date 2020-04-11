import "./scss/index.scss";

import * as React from "react";

import { Button, Form, TextField } from "../..";
import { maybe } from "../../../core/utils";
import { TypedCustomerRegisterMutation } from "./queries";
import { RegisterCutomer } from "./types/RegisterCutomer";

import { AlertManager, useAlert } from "react-alert";



const RegisterForm: React.FC<{ hide: () => void }> = ({ hide }) => {
  const alert = useAlert();
  const showSuccessNotification = (
  data: RegisterCutomer,
  hide: () => void,
  alert: AlertManager
) => {
  const successful = maybe(() => !data.accountRegister.errors.length);

  if (successful) {
    hide();
    alert.show(
      {
        title: "New user has been created",
      },
      { type: "success" }
    );
  }
};
  return (
    <TypedCustomerRegisterMutation
      onCompleted={data => {
        // showSuccessNotification(data)
      }}
    >
      {(registerCustomer, { loading, data }) => {
        return (
          <Form
            errors={maybe(() => data.accountRegister.errors, [])}
            onSubmit={(event, { phone, password }) => {
              event.preventDefault();
              registerCustomer({ variables: { phone, password } });
            }}
          >
            <TextField
              name="phone"
              autoComplete="phone"
              label="Enter Phone Number"
              type="text"
              required
            />
            <TextField
              name="password"
              autoComplete="password"
              label="Password"
              type="password"
              required
            />
            <div className="login__content__button">
              <Button type="submit" {...loading && { disabled: true }}>
                {loading ? "Loading" : "Register"}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedCustomerRegisterMutation>
  );
};

export default RegisterForm;
