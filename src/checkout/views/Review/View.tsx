import "./scss/index.scss";

import { History } from "history";
import * as React from "react";
import { AlertManager, useAlert } from "react-alert";
import { generatePath, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { Money } from "@components/containers";

import { orderConfirmationUrl } from "../../../app/routes";
import { Button, CartTable } from "../../../components";
import { CartContext } from "../../../components/CartProvider/context";
import { extractCartLines,getTotal } from "../../../components/CartProvider/utils";
import { CheckoutContext } from "../../context";
import { paymentUrl } from "../../routes";
import { TypedCompleteCheckoutMutation } from "./queries";
import Summary from "./Summary";
import { completeCheckout } from "./types/completeCheckout";

import { maybe } from "../../../core/utils";

import { TypedProductVariantsQuery } from "../../../views/Product/queries";

const completeCheckout = (
  data: completeCheckout,
  history: History,
  clearCheckout: () => void,
  clearCart: () => void,
  alert: AlertManager
) => {
  const canProceed = !data.checkoutComplete.errors.length;

  if (canProceed) {
    const { token } = data.checkoutComplete.order;
    history.push({
      pathname: orderConfirmationUrl,
      state: { token },
    });
    clearCheckout();
    clearCart();
  } else {
    data.checkoutComplete.errors.map(error => {
      alert.show(
        { title: error.message },
        {
          type: "error",
        }
      );
    });
  }
};

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    params: { token },
  },
}) => {
  const alert = useAlert();
  const {
    cardData,
    dummyStatus,
    checkout,
    clear: clearCheckout,
  } = React.useContext(CheckoutContext);
  const { clear: clearCart } = React.useContext(CartContext);

  const discountExists = checkout.discount && !!checkout.discount.amount;
  const locale = maybe(() => "PK", "PK");
  return (
    <>
      <div className="checkout-review">
        <Link
          to={generatePath(paymentUrl, { token })}
          className="checkout-review__back"
        >
          Go back to the previous Step
        </Link>

        <div className="checkout__step checkout__step--inactive">
          <span>{checkout.isShippingRequired ? "5" : "3"}</span>
          <h4 className="checkout__header">Review your order</h4>
        </div>

        <div className="checkout__content">
        <CartContext.Consumer>
                    {cart => (
        <TypedProductVariantsQuery
          variables={{
            ids: cart.lines.map(line => line.variantId),
          }}
        >
          {({ data }) => (
            <CartTable
              lines={extractCartLines(data, cart.lines, locale)}
              // subtotal={<TaxedMoney taxedMoney={checkout.subtotalPrice} />}
              subtotal={getTotal(data, cart.lines, locale)}
              deliveryCost={
                <Money defaultValue="0" money={checkout.shippingMethod?.price} />
              }
              totalCost={getTotal(data, cart.lines, locale)}
              // totalCost={<Money money={checkout.totalPrice.gross} />}
              discount={
                discountExists && (
                  <>
                    - <Money money={checkout.discount} />
                  </>
                )
              }
              discountName={checkout.discountName}
            />
          )}
          </TypedProductVariantsQuery>
           )}
           </CartContext.Consumer>
          <div className="checkout-review__content">
            <Summary
              checkout={checkout}
              cardData={cardData}
              dummyStatus={dummyStatus}
              history={history}
              token={token}
            />
            <div className="checkout-review__content__submit">
              <TypedCompleteCheckoutMutation
                onCompleted={data =>
                  completeCheckout(
                    data,
                    history,
                    clearCheckout,
                    clearCart,
                    alert
                  )
                }
              >
                {(completeCheckout, { loading }) => (
                  <Button
                    type="submit"
                    disabled={loading}
                    onClick={() =>
                      completeCheckout({
                        variables: {
                          checkoutId: checkout.id,
                        },
                      })
                    }
                  >
                    {loading ? "Loading" : "Place your order"}
                  </Button>
                )}
              </TypedCompleteCheckoutMutation>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
