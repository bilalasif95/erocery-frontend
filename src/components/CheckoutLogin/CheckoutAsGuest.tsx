import React from "react";

import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { Button } from "..";
// import { OverlayTheme, OverlayType } from "..";
import { OverlayContextInterface } from "../Overlay";

const CheckoutAsGuest: React.FC<{
  overlay: OverlayContextInterface;
  checkoutUrl: string;
}> = ({ overlay, checkoutUrl }) => {
  const [value, setValue] = React.useState("")
  const onCaptchaHandler = (value) => {
    setValue(value)
  };
  return (
    <div className="checkout-login__guest">
      <h3 className="checkout__header">Continue as a guest</h3>
      <p>
        If you don’t wish to register an account, don’t worry. You can checkout as
        a guest. We care about you just as much as any registered user.
    </p>
      <div className="recaptcha">
        <ReCAPTCHA
          style={{
            transform: "scale(0.77)",
            transformOrigin: "0 0",
          }}
          className="g-recaptcha"
          data-theme="light"
          // sitekey="6LdbyQUaAAAAAAt-FT1vUlibUgfFtqQlEDGSKyf6"
          sitekey="6LdUyQUaAAAAAC34aQaS-umjwaVjMbJai2d0XyX5"
          onChange={onCaptchaHandler}
          height="100px"
          width="100%"
        />
      </div>
      {value ?
        <Link to={checkoutUrl}>
          <Button>Continue as a guest</Button>
        </Link>
        : <Button disabled>Continue as a guest</Button>}


      {/* <p>
      You can also{" "}
      <span
        className="u-link"
        onClick={() => overlay.show(OverlayType.register, OverlayTheme.right)}
      >
        create an account
      </span>
    </p> */}
    </div>
  )
};

export default CheckoutAsGuest;
