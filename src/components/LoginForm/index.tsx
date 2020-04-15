import "./scss/index.scss";

import { useSignIn } from "@sdk/react";
import { maybe } from "@utils/misc";
import * as React from "react";

import { Button, Form, TextField } from "..";
import { CheckoutContext } from "../../checkout/context";
import VerifyCodeForm from "./verifyCode";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({ hide }) => {
  const [signIn, { loading, error }] = useSignIn();
  const { update } = React.useContext(CheckoutContext);
  const [message, setMessage] = React.useState(true);
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleOnSubmit = async (evt, { phone, password }) => {
    evt.preventDefault();
    setPassword(password);
    const authenticated = await signIn({ phone, password });
    setMessage(authenticated.data.user.phone_verified)
    setPhone(authenticated.data.user.phone)
    if (authenticated && hide && authenticated.data.user.phone_verified) {
      hide();
    }
    update({ syncUserCheckout: true });
  };

  return (
    <>
    {!message ?
    <VerifyCodeForm hide={hide} phone={phone} password={password}/>
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
