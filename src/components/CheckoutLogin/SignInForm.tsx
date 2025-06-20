import React from "react";
import { LoginForm } from "../";
import ForgottenPassword from "../OverlayManager/Login/ForgottenPassword";

const SignInForm: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <div>
    <h3 className="checkout__header">Registered user</h3>
    <LoginForm />
    <ForgottenPassword onClick={onClick} />
  </div>
);

export default SignInForm;
