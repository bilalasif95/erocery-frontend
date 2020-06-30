import "./scss/index.scss";

import { useResendSMSCode } from "@sdk/react";

import * as React from "react";
import ReactSVG from "react-svg";

import Timer from "react-compound-timer";

import { Button, Form, TextField } from "..";
import { maybe } from "../../core/utils";
import removeImg from "../../images/pass-invisible.svg";
import removeImgg from "../../images/pass-visible.svg";
import {
  TypedPasswordResetMutation,
  TypedVerifyPasswordResetMutation,
} from "./queries";

import { useAlert } from "react-alert";
// import { passwordResetUrl } from "../../app/routes";

const PasswordResetForm: React.FC<{ hide: () => void }> = ({ hide }) => {
  const alert = useAlert();
  const [message, setMessage] = React.useState(true);
  const [passwordType, setPasswordType] = React.useState(true);
  const [resendSMSCode] = useResendSMSCode();
  const [timer, setTimer] = React.useState(179);
  const [phone, setPhoneNumber] = React.useState("03");
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer(timer=>timer-1);
  //   }, 1000);
  //   if (timer === 0) {
  //     setTimer(0);
  //   }
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [timer]);
  const sendCode = async e => {
    e.preventDefault();
    const authenticated = await resendSMSCode({ phone });
    if (authenticated.data.accountResendSms.errors.length === 0) {
      setTimer(179);
    }
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
        <div className="password-reset-form">
          <p>
            Please provide us code sent on your phone number and new password so
            we can reset your password
          </p>
          <TypedVerifyPasswordResetMutation>
            {(passwordReset, { loading, data }) => {
              if (data && data.accountForgotVerify.errors.length === 0) {
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
                    autoComplete="tel"
                    label="Enter SMS Code"
                    type="tel"
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
                  <div className="password-reset-form__button resetBtns displayflex">
                    <Button type="submit" {...(loading && { disabled: true })}>
                      {loading ? "Loading" : "Reset password"}
                    </Button>
                    <Button
                      onClick={sendCode}
                      className="smsCodebtn"
                      disabled={timer > 0}
                    >
                      {timer > 0 ? (
                        <Timer
                          initialTime={179000}
                          direction="backward"
                          checkpoints={[
                            {
                              callback: () => setTimer(0),
                              time: 0,
                            },
                          ]}
                        >
                          Send Again(
                         <Timer.Minutes formatValue={value => `${'0'+value} `} />:
                         <Timer.Seconds formatValue={value => `${value <10 ? '0'+value:value}`} />)
                        </Timer>
                      ) : (
                          "Send Code"
                        )}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </TypedVerifyPasswordResetMutation>
        </div>
      ) : (
          <div className="password-reset-form">
            <p>
              Please provide us your phone number so we can share you a code to
              reset your password
          </p>
            <br />
            <TypedPasswordResetMutation>
              {(passwordReset, { loading, data }) => {
                if (data && data.accountForgotPassword.errors.length === 0) {
                  setMessage(false);
                  setPhoneNumber(data.accountForgotPassword.user.phone);
                }
                return (
                  <Form
                    errors={maybe(() => data.accountForgotPassword.errors, [])}
                    onSubmit={(event, { phone }) => {
                      event.preventDefault();
                      passwordReset({
                        variables: {
                          phone: "03"+phone,
                          // redirectUrl: `${window.location.origin}${passwordResetUrl}`,
                        },
                      });
                    }}
                  >
                    <div className="phoneField">
                      <div className="startNum">03</div>
                      <TextField
                        name="phone"
                        autoComplete="tel"
                        label="Phone Number"
                        type="tel"
                        required
                      />
                    </div>
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
        )}
    </>
  );
};

export default PasswordResetForm;
