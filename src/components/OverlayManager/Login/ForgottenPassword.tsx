import React from "react";

const ForgottenPassword: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <div>
    <div className="login__content__password-reminder">
      <p>
        Have you forgotten your password?&nbsp;
        <span className="u-link" onClick={onClick}>
          Click Here
        </span>
      </p>
    </div>
  </div>
);

export default ForgottenPassword;
