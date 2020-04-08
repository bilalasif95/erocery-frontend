import "./scss/index.scss";

import * as React from "react";
import { useState } from "react";
import { useSignIn,useVerifyCode } from "@sdk/react";
import { maybe } from "@utils/misc";

import { Button, Form, TextField } from "..";
import { CheckoutContext } from "../../checkout/context";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({ hide }) => {
  const [signIn, { loading, error }] = useSignIn();
  const [phone, setPhone] = useState("");
  const [verifyCode, { loading2, error2 }] = useVerifyCode();
  const { update } = React.useContext(CheckoutContext);
  const [message, setMessage] = useState(true);

  const handleOnSubmit = async (evt, { phone, password }) => {
    evt.preventDefault();
    const authenticated = await signIn({ phone, password });
    setMessage(authenticated.data.user.phone_verified)
    setPhone(authenticated.data.user.phone)
    if (authenticated && hide && authenticated.data.user.phone_verified) {
      hide();
    }
    update({ syncUserCheckout: true });
  };

  const handleOnCodeSubmit = async (evt, {code}) => {
    evt.preventDefault();
    const authenticated = await verifyCode({ code ,phone });
    if (authenticated && hide) {
        hide();
      }
  }
  return (
    <>
    {!message ?
    <div className="login-form">
      <Form
        errors={maybe(() => error.extraInfo.userInputErrors, [])}
        onSubmit={handleOnCodeSubmit}
      >
        <TextField
          name="code"
          autoComplete="code"
          label="Enter Verification Code"
          type="number"
          required
        />
        <div className="login-form__button">
          <Button type="submit" {...(loading && { disabled: true })}>
            {loading ? "Loading" : "Verify"}
          </Button>
        </div>
      </Form>
    </div>
    :
    <div className="login-form">
      <Form
        errors={maybe(() => error.extraInfo.userInputErrors, [])}
        onSubmit={handleOnSubmit}
      >
        <TextField
          name="phone"
          autoComplete="phone"
          label="Enter Phone Number"
          type="number"
          minLength={13}
          required
        />
        <TextField
          name="password"
          autoComplete="password"
          label="Password"
          type="password"
          required
        />
        <div className="login-form__button">
          <Button type="submit" {...(loading && { disabled: true })}>
            {loading ? "Loading" : "Sign in"}
          </Button>
        </div>
      </Form>
    </div>
    }
    </>
  );
};

export default LoginForm;
