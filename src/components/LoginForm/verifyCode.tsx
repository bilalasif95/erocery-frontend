import "./scss/index.scss";

import { useResendSMSCode,useVerifyCode } from "@sdk/react";
import { maybe } from "@utils/misc";
import React,{ useEffect,useState } from "react";

import { Button, Form, TextField } from "..";

import {
  setAuthToken
} from "../../../src/@sdk/auth";

import { useAlert } from "react-alert";

interface IVerifyCodeForm {
  hide?: () => void;
  phone: string;
  password: string;
}

const VerifyCodeForm: React.FC<IVerifyCodeForm> = ({ hide, phone,password }) => {
  const [verifyCode, { loading, error }] = useVerifyCode();
  const alert = useAlert();
  const [resendSMSCode] = useResendSMSCode();
  const [timer, setTimer] = useState(59);
  const handleOnCodeSubmit = async (evt, {smsCode}) => {
    evt.preventDefault();
    const authenticated = await verifyCode({ smsCode, phone, password});
    setAuthToken(authenticated.data.accountVerify.token)
    if (authenticated && hide) {
      hide();
      alert.show(
        {
          title: "You are now logged in",
        },
        { type: "success", timeout: 5000 }
      );
    }
  }
  useEffect(() => {
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
  return (
    <div className="login-form">
      <Form
        errors={maybe(() => error.extraInfo.userInputErrors, [])}
        onSubmit={handleOnCodeSubmit}
      >
        <TextField
          name="smsCode"
          autoComplete="smsCode"
          label="Enter Verification Code"
          type="number"
          required
        />
        <div className="login-form__button displayflex">
          <Button type="submit" disabled={timer < 0} {...(loading && { disabled: true })}>
            {loading ? "Loading" : "Verify"}
          </Button>
          <Button onClick={sendCode} className="smsCodebtn" disabled={timer > 0}>
            {timer > 0 ? `Send Again(${timer})`: "Send SMS"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default VerifyCodeForm;
