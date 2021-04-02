import "./scss/index.scss";

import { Link } from "react-router-dom";

import { Button } from "../../components";

import * as React from "react";

const PaymentSuccess: React.FC = () => (
  <div className="order-confirmation">
    <h3>
      Payment Not SuccessFul! <br />
    </h3>
    {/* <p className="order-confirmation__info">
      We’ll call you on provided phone number for order confirmation
      <br />
      and we’ll notify you when the order has been
      <br />
      shipped.
    </p> */}
    <div className="order-confirmation__actions">
      <Link to={"/"}>
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  </div>
);

export default PaymentSuccess;
