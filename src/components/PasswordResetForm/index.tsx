import "./scss/index.scss";

import { useResendSMSCode } from "@sdk/react";

import * as React from "react";
import ReactSVG from "react-svg";

import { Button, Form, TextField } from "..";
import { maybe } from "../../core/utils";
import removeImg from "../../images/pass-invisible.svg";
import removeImgg from "../../images/pass-visible.svg";
import { TypedPasswordResetMutation,TypedVerifyPasswordResetMutation } from "./queries";

import { useAlert } from "react-alert";
// import { passwordResetUrl } from "../../app/routes";

const PasswordResetForm: React.FC<{ hide: () => void }> = ({ hide }) => {
  const alert = useAlert();
  const [message, setMessage] = React.useState(true);
  const [passwordType, setPasswordType] = React.useState(true);
  const [resendSMSCode] = useResendSMSCode();
  const [timer, setTimer] = React.useState(59);
  const [phone, setPhoneNumber] = React.useState("");
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer=>timer-1);
    }, 1000);
    if (timer === 0) {
      setTimer(0);
    }
    return () => {
      clearInterval(interval)
    }
  }, [timer]);
  const sendCode = async (e) => {
    e.preventDefault();
    const authenticated = await resendSMSCode({ phone });
    if (authenticated.data.accountResendSms.errors.length === 0) {
      setTimer(59);
    }
  }
  const onPasswordEyeIconClick = () => {
		if (passwordType) {
			return setPasswordType(false)
		}
		setPasswordType(true)
	};
  return (
    <>
    {!message ?
    <div className="password-reset-form">
    <p>
      Please provide us your phone number, code sent on your phone number and new password so we can reset
      your password
    </p>
    <TypedVerifyPasswordResetMutation>
      {(passwordReset, { loading, data }) => {
        if(data && data.accountForgotVerify.errors.length === 0){
          hide();
          alert.show(
                {
                  title: "Password is reset. Please login.",
                },
                { type: "success", timeout: 5000 }
              );
        }
        return (
          <Form
            errors={maybe(() => data.accountForgotVerify.errors, [])}
            onSubmit={(event, { smsCode, newPassword }) => {
              event.preventDefault();
              passwordReset({
                variables: {
                  newPassword,
                  phone,
                  smsCode,
                },
              });
            }}
          >
            <TextField
              name="smsCode"
              autoComplete="smsCode"
              label="Enter SMS Code"
              type="number"
              required
            />
            {passwordType ? (
              <div className="passwordInput">
                <TextField
                  name="newPassword"
                  autoComplete="newPassword"
                  label="Enter New Password"
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
                  name="newPassword"
                  autoComplete="newPassword"
                  label="Enter New Password"
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
            <div className="password-reset-form__button displayflex">
              <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Loading" : "Reset password"}
              </Button>
              <Button onClick={sendCode} className="smsCodebtn" disabled={timer > 0}>
                {timer > 0 ? `Send Again(${timer})`: "Send SMS"}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedVerifyPasswordResetMutation>
  </div>
  :
  <div className="password-reset-form">
    <p>
      Please provide us your phone number so we can share you a code to reset
      your password
    </p>
    <TypedPasswordResetMutation>
      {(passwordReset, { loading, data }) => {
        if(data && data.accountForgotPassword.errors.length === 0){
          setMessage(false)
          setPhoneNumber(data.accountForgotPassword.user.phone)
        }
        return (
          <Form
            errors={maybe(() => data.accountForgotPassword.errors, [])}
            onSubmit={(event, { phone }) => {
              event.preventDefault();
              passwordReset({
                variables: {
                  phone,
                  // redirectUrl: `${window.location.origin}${passwordResetUrl}`,
                },
              });
            }}
          >
            <TextField
              name="phone"
              autoComplete="phone"
              label="Phone Number"
              type="number"
              required
            />
            <div className="password-reset-form__button">
              <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Loading" : "Reset password"}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedPasswordResetMutation>
  </div>
  }
  </>
  )
};

export default PasswordResetForm;
