import "./scss/index.scss";

import { useResendSMSCode, useVerifyCode } from "@sdk/react";
import React, { useState } from "react";
import ReactSVG from "react-svg";

import Timer from "react-compound-timer";

import { Button, Form, NumberField, TextField } from "../..";
import { maybe } from "../../../core/utils";
import removeImg from "../../../images/pass-invisible.svg";
import removeImgg from "../../../images/pass-visible.svg";
import { TypedAccountRegisterMutation } from "./queries";
import { RegisterAccount } from "./types/RegisterAccount";

import { setAuthToken } from "../../../../src/@sdk/auth";

import { AlertManager, useAlert } from "react-alert";
import { accountConfirmUrl } from "../../../app/routes";

const showSuccessNotification = (
  data: RegisterAccount,
  hide: () => void,
  alert: AlertManager
) => {
  maybe(() => !data.accountRegister.errors.length);
  // if (successful) {
  //   hide();
  //   alert.show(
  //     {
  //       title: data.accountRegister.requiresConfirmation
  //         ? "Please check your e-mail for further instructions"
  //         : "New user has been created",
  //     },
  //     { type: "success", timeout: 5000 }
  //   );
  // }
};

const RegisterForm: React.FC<{ hide: () => void }> = ({ hide }) => {
  const alert = useAlert();
  const [message, setMessage] = useState(true);
  const [passwordType, setPasswordType] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [timer, setTimer] = useState(179);
  const [verifyCode, { loading, error }] = useVerifyCode();
  const [resendSMSCode] = useResendSMSCode();
  // useEffect(() => {
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
  const handleOnCodeSubmit = async (evt, { smsCode }) => {
    evt.preventDefault();
    const authenticated = await verifyCode({ smsCode, phone: "03" + phone, password });
    setAuthToken(authenticated.data.accountVerify.token);
    if (authenticated && hide) {
      hide();
      alert.show(
        {
          title: "You are now logged in",
        },
        { type: "success", timeout: 5000 }
      );
    }
  };
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
        <div className="login-form">
          <Form
            errors={maybe(() => error.extraInfo.userInputErrors, [])}
            onSubmit={handleOnCodeSubmit}
          >
            <TextField
              name="smsCode"
              autoComplete="tel"
              label="Enter Verification Code"
              type="tel"
              required
            />
            <div className="login-form__button displayflex">
              <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? "Loading" : "Verify"}
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
                    <Timer.Minutes />:
                    <Timer.Seconds />)
                  </Timer>
                ) : (
                    "Send Code"
                  )}
              </Button>
            </div>
          </Form>
        </div>
      ) : (
          <TypedAccountRegisterMutation
            onCompleted={data => showSuccessNotification(data, hide, alert)}
          >
            {(registerCustomer, { loading, data }) => {
              if (data && data.accountRegister.errors.length === 0) {
                setMessage(false);
                setPhone(data.accountRegister.user.phone);
              }
              return (
                <Form
                  errors={maybe(() => data.accountRegister.errors, [])}
                  onSubmit={(event, { email, phone, password }) => {
                    event.preventDefault();
                    setPassword(password);
                    const redirectUrl = `${window.location.origin}${accountConfirmUrl}`;
                    registerCustomer({
                      variables: { email: email || "", phone, password, redirectUrl },
                    });
                  }}
                >
                  <div className="phoneField">
                    <div className="startNum">03</div>
                    <TextField
                      name="phone"
                      autoComplete="tel"
                      label="Enter Phone Number"
                      type="tel"
                      required
                    />
                  </div>
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
                  <TextField
                    name="email"
                    autoComplete="email"
                    label="Email (Optional)"
                    type="email"
                  />
                  <div className="login__content__button">
                    <Button type="submit" {...(loading && { disabled: true })}>
                      {loading ? "Loading" : "Register"}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </TypedAccountRegisterMutation>
        )}
    </>
  );
};

export default RegisterForm;
