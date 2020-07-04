import "./scss/index.scss";

import { History } from "history";
import * as React from "react";
import { AlertManager, useAlert } from "react-alert";
import { generatePath, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { Money } from "@components/containers";
import JazzCash from "../Payment/Gateways/JazzCash";

import { orderConfirmationUrl } from "../../../app/routes";
import { Button, CartTable } from "../../../components";
import { CartContext } from "../../../components/CartProvider/context";
import {
  extractCartLines,
  getBakraTotal,
  // getTotal,
} from "../../../components/CartProvider/utils";
// import JazzCash from "../../../bakracheckout/views/Payment/Gateways/JazzCash";
import { BakraCheckoutContext } from "../../context";
import { paymentUrl } from "../../routes";
import { TypedCompleteCheckoutMutation } from "./queries";

import Summary from "./Summary";
import { completeCheckout } from "./types/completeCheckout";

import { maybe } from "../../../core/utils";

import { TypedProductVariantsQuery } from "../../../views/Product/queries";

function formatDate(days = 0) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return (
    date.getFullYear() +
    "" +
    (date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : "0" + "" + (date.getMonth() + 1)) +
    "" +
    (date.getDate() >= 10 ? date.getDate() : "0" + "" + date.getDate()) +
    "" +
    (date.getHours() >= 10 ? date.getHours() : "0" + "" + date.getHours()) +
    "" +
    (date.getMinutes() >= 10
      ? date.getMinutes()
      : "0" + "" + date.getMinutes()) +
    "" +
    date.getSeconds()
  );
}

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

    // if (data.checkoutComplete.order.payments[0].gateway !== "JazzCash") {
    history.push({
      pathname: orderConfirmationUrl,
      state: { token },
    });
    // }

    // clearCheckout();
    // clearCart();
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
  } = React.useContext(BakraCheckoutContext);
  const { clear: clearCart } = React.useContext(CartContext);

  const discountExists = checkout.discount && !!checkout.discount.amount;
  const locale = maybe(() => "PK", "PK");
  const bakraLines = JSON.parse(localStorage.getItem("bakraLines"));

  let HashKey = "";
  let SortedArray = "";

  let HashArrayActual = [];
  let PostURLActual = "";

  if (dummyStatus.jazzCashDetails) {
    HashKey = dummyStatus.jazzCashDetails.hashKey;
    SortedArray = HashKey;

    const Amount = checkout.totalPrice.gross.amount * 0.25 * 100;
    const BillReference: any = formatDate();
    const Description = "Thank you for using Jazz Cash";
    const DiscountedAmount = "";
    const DiscountedBank = "";
    const Language = "EN";
    const MerchantID = dummyStatus.jazzCashDetails.merchantId;
    const Password = dummyStatus.jazzCashDetails.password;
    const ReturnURL = dummyStatus.jazzCashDetails.returnUrl;
    const TxnCurrency = "PKR";
    const TxnDateTime: any = formatDate();
    const TxnExpiryDateTime: any = formatDate(8);
    const TxnRefNumber: any = "T".concat(formatDate());
    const Version = dummyStatus.jazzCashDetails.version;
    const TxnType = "";
    const PPMPF_1 = checkout.token;
    const PPMPF_2 = "";
    const PPMPF_3 = "";
    const PPMPF_4 = "";
    const PPMPF_5 = "";
    const PostURL = dummyStatus.jazzCashDetails.postUrl;

    const HashArray = [
      Amount,
      BillReference,
      Description,
      DiscountedAmount,
      DiscountedBank,
      Language,
      MerchantID,
      Password,
      ReturnURL,
      TxnCurrency,
      TxnDateTime,
      TxnExpiryDateTime,
      TxnRefNumber,
      TxnType,
      Version,
      PPMPF_1,
      PPMPF_2,
      PPMPF_3,
      PPMPF_4,
      PPMPF_5,
    ];

    for (const hash of HashArray) {
      if (hash !== undefined && hash !== null && hash !== "") {
        SortedArray += "&" + hash;
      }
    }

    HashArrayActual = HashArray;
    PostURLActual = PostURL;
  }

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
          <span>{checkout.isShippingRequired ? "4" : "3"}</span>
          <h4 className="checkout__header">Review your order</h4>
        </div>

        <div className="checkout__content">
          <CartContext.Consumer>
            {cart => (
              <TypedProductVariantsQuery
                variables={{
                  ids: bakraLines.map(line => line.variantId),
                }}
              >
                {({ data }) => (
                  <CartTable
                    lines={extractCartLines(data, bakraLines, locale)}
                    // subtotal={<TaxedMoney taxedMoney={checkout.subtotalPrice} />}
                    subtotal={getBakraTotal(data, bakraLines, locale)}
                    deliveryCost={
                      <Money
                        defaultValue="0"
                        money={checkout.shippingMethod?.price}
                      />
                    }
                    payCost={
                      <Money
                        defaultValue="0"
                        money={{
                          amount: checkout.totalPrice.gross.amount * 0.25,
                          currency: checkout.totalPrice.gross.currency,
                        }}
                      />
                    }
                    balanceCost={
                      <Money
                        defaultValue="0"
                        money={{
                          amount:
                            checkout.totalPrice.gross.amount -
                            checkout.totalPrice.gross.amount * 0.25,
                          currency: checkout.totalPrice.gross.currency,
                        }}
                      />
                    }
                    // totalCost={getTotal(data, cart.lines, locale)}
                    totalCost={<Money money={checkout.totalPrice.gross} />}
                    discount={
                      discountExists && (
                        <>
                          - <Money money={checkout.discount} />
                        </>
                      )
                    }
                    discountName={checkout}
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
                  <div>
                    {dummyStatus.type === "JazzCash" ? (
                      <div>
                        <p
                          style={{
                            color: "red",
                            fontSize: "12px",
                            paddingBottom: "10px",
                          }}
                        >
                          Note: You will be redirected to JazzCash portal after
                          placing your order. Please, have your Mobile Account
                          Number/Card Number and CNIC ready.
                        </p>
                        <JazzCash
                          completeCheckout={() =>
                            completeCheckout({
                              variables: {
                                checkoutId: checkout.id,
                              },
                            })
                          }
                          paymentAmount={
                            checkout && checkout.totalPrice.gross.amount
                          }
                          hashArr={HashArrayActual}
                          hashKey={HashKey}
                          sortedArray={SortedArray}
                          postUrl={PostURLActual}
                        />
                      </div>
                    ) : (
                      <div>
                        {dummyStatus.type === "WireTransfer" && (
                          <p
                            style={{
                              color: "red",
                              paddingBottom: "10px",
                            }}
                          >
                            Note: Please save bank information for future
                            reference
                          </p>
                        )}

                        <Button
                          type="submit"
                          disabled={loading}
                          onClick={() => {
                            completeCheckout({
                              variables: {
                                checkoutId: checkout.id,
                              },
                            });
                          }}
                        >
                          {loading ? "Loading" : "Place your order"}
                        </Button>
                      </div>
                    )}
                  </div>
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
