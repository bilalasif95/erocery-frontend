import "./scss/index.scss";

import React from "react";
import { generatePath, Link, RouteComponentProps } from "react-router-dom";

import { guestOrderDetailsUrl } from "../../../app/routes";
import { Button, NotFound } from "../../../components";
import { BASE_URL } from "../../../core/config";
import { userOrderDetailsUrl } from "../../../userAccount/routes";

type TState = { token: any; id: number };

const View: React.FC<RouteComponentProps> = ({
  history: {
    location: { state },
  },
}) => {
  if (!state) {
    return <NotFound />;
  }

  const { token, id } = state as TState;
  const guest = !id;
  const orderDetailsRef = guest
    ? generatePath(guestOrderDetailsUrl, { token })
    : generatePath(userOrderDetailsUrl, { id });

  return (
    <div className="order-confirmation">
      <h3>
        Thank you for <br /> your order
      </h3>
      <p className="order-confirmation__info">
        We’ll call you on provided phone number for order confirmation
        <br />
        and we’ll notify you when order has been
        <br />
        shipped.
      </p>
      <div className="order-confirmation__actions">
        <Link to={BASE_URL}>
          <Button onClick={e => e.preventDefault()}>Continue Shopping</Button>
        </Link>
        <Link to={orderDetailsRef}>
          <Button onClick={e => e.preventDefault()}>Order Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default View;
