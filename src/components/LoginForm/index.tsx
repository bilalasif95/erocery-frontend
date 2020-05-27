import "./scss/index.scss";

import { useSignIn } from "@sdk/react";
import { maybe } from "@utils/misc";
import * as React from "react";
import ReactSVG from "react-svg";

import { Button, Form, TextField } from "..";
import { CheckoutContext } from "../../checkout/context";
import removeImg from "../../images/pass-invisible.svg";
import removeImgg from "../../images/pass-visible.svg";
import VerifyCodeForm from "./verifyCode";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({ hide }) => {
  const [signIn, { loading, error }] = useSignIn();
  const { update } = React.useContext(CheckoutContext);
  const [message, setMessage] = React.useState(true);
  const [passwordType, setPasswordType] = React.useState(true);
  const [phone, setPhone] = React.useState("03");
  const [password, setPassword] = React.useState("");
  const handleOnSubmit = async (evt, { phone, password }) => {
    evt.preventDefault();
    setPassword(password);
    const authenticated = await signIn({ phone, password });
    setMessage(authenticated.data.user.phone_verified);
    setPhone(authenticated.data.user.phone);
    if (authenticated && hide && authenticated.data.user.phone_verified) {
      hide();
    }
    update({ syncUserCheckout: true });
  };
  const onPasswordEyeIconClick = () => {
    if (passwordType) {
      return setPasswordType(false);
    }
    setPasswordType(true);
  };
  return (
    <>
      {!message ? (
        <VerifyCodeForm hide={hide} phone={phone} password={password} />
      ) : (
        <div className="login-form">
          <Form
            errors={maybe(() => error.extraInfo.userInputErrors, [])}
            onSubmit={handleOnSubmit}
          >
            <TextField
              name="phone"
              autoComplete="tel"
              label="Enter Phone Number"
              type="tel"
              onChange={e => setPhone(e.target.value)}
              value={phone}
              required
            />
            {passwordType ? (
              <div className="passwordInput">
                <TextField
                  name="password"
                  autoComplete="password"
                  label="Password"
                  type="password"
                  required
                />
                <ReactSVG
                  path={removeImg}
                  className="passwordEye"
                  onClick={onPasswordEyeIconClick}
                />
              </div>
            ) : (
              <div className="passwordInput">
                <TextField
                  name="password"
                  autoComplete="password"
                  label="Password"
                  type="text"
                  required
                />
                <ReactSVG
                  path={removeImgg}
                  className="passwordEye"
                  onClick={onPasswordEyeIconClick}
                />
              </div>
            )}
            <div className="login-form__button">
              <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Loading" : "Sign in"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
