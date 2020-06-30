import "./scss/index.scss";

import React, { useContext, useState } from "react";
import { Redirect } from "react-router";

import { useUserDetails } from "@sdk/react";

import { Offline, OfflinePlaceholder, Online, OverlayContext, OverlayTheme, OverlayType } from "..";

import { baseUrl as checkoutUrl } from "../../checkout/routes";

import CheckoutAsGuest from "./CheckoutAsGuest";
import ResetPasswordForm from "./ResetPasswordForm";
import SignInForm from "./SignInForm";

const CheckoutLogin: React.FC<{}> = () => {
  const [resetPassword, setResetPassword] = useState(false);
  const overlay = useContext(OverlayContext);
  const { data: user } = useUserDetails();
  if (user) {
    return <Redirect to={checkoutUrl} />;
  }
  return (
    <div>
      <div className="container">
        <Online>
          <div className="checkout-login">
            <CheckoutAsGuest overlay={overlay} checkoutUrl={checkoutUrl} />
            <div className="checkout-login__user">
              {resetPassword ? (
                <ResetPasswordForm
                  onClick={() => {
                    setResetPassword(false);
                  }}
                />
              ) : (
                  <SignInForm
                    onClick={() => {
                      setResetPassword(true);
                    }}
                  />
                )}
              <p>
                You can also{" "}
                <span
                  className="u-link"
                  onClick={() => overlay.show(OverlayType.register, OverlayTheme.right)}
                >
                  create an account
              </span>
              </p>
            </div>
          </div>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
    </div>
  );
};

export default CheckoutLogin;
