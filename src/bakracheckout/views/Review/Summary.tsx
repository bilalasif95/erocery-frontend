import { History } from "history";
import * as React from "react";
import { generatePath } from "react-router";
import ReactSVG from "react-svg";

import { AddressSummary } from "../../../components";
import { CardData } from "../../types/CardData";
import { Checkout } from "../../types/Checkout";

import copyImg from "../../../images/copy.svg";
import {
  paymentUrl,
  shippingAddressUrl,
  shippingOptionsUrl,
} from "../../routes";

class Summary extends React.PureComponent<{
  checkout: Checkout;
  cardData: CardData;
  dummyStatus: any;
  history: History;
  token: string;
}> {
  render() {
    // const { checkout, cardData, dummyStatus, history, token } = this.props;
    const { checkout, cardData, history, token, dummyStatus } = this.props;
    const handleEdit = (editUrl: string) => {
      history.push(
        generatePath(editUrl, {
          token,
        })
      );
    };

    console.log(dummyStatus, "dummyStatus");

    return (
      <div className="checkout-review__content__summary">
        <div>
          <h4>
            Shipping address
            <ReactSVG
              className="checkout-review__summary-copy"
              path={copyImg}
              onClick={() => handleEdit(shippingAddressUrl)}
            />
          </h4>
          <AddressSummary
            address={checkout.isShippingRequired && checkout.shippingAddress}
            email={checkout.email}
          />
        </div>
        {/* <div>
          <h4>
            Billing address
            <ReactSVG
              className="checkout-review__summary-copy"
              onClick={() => handleEdit(billingUrl)}
              path={copyImg}
            />
          </h4>
          <AddressSummary address={checkout.billingAddress} />
        </div> */}
        {checkout.isShippingRequired && (
          <div>
            <h4>
              Shipping method
              <ReactSVG
                className="checkout-review__summary-copy"
                onClick={() => handleEdit(shippingOptionsUrl)}
                path={copyImg}
              />
            </h4>
            <p>{checkout.shippingMethod?.name}</p>
          </div>
        )}
        <div>
          <h4>
            Payment method
            <ReactSVG
              className="checkout-review__summary-copy"
              onClick={() => handleEdit(paymentUrl)}
              path={copyImg}
            />
          </h4>
          <p>
            {!!cardData ? (
              `Ending in ${cardData.lastDigits}`
            ) : (
              <div>
                {dummyStatus.type === "JazzCash" ? (
                  <div>
                    <h2 style={{ fontWeight: 900 }}>Jazz Cash</h2>
                  </div>
                ) : dummyStatus.type === "WireTransfer" ? (
                  <div>
                    <h2 style={{ fontWeight: 900 }}>Wire Transfer</h2>
                    <p>Account Title:{dummyStatus.accountTitle}</p>
                    <p>Account No.:{dummyStatus.accountName}</p>
                    <p>Bank Name:{dummyStatus.bankName}</p>
                    <p>IBAN:{dummyStatus.branchCode}</p>
                    <p>Branch Code:{dummyStatus.mobileno}</p>
                  </div>
                ) : (
                  <div>
                    <h2 style={{ fontWeight: 900 }}>Office Visit</h2>
                    <p>Office Address: {dummyStatus.officeAddress}</p>
                    <p>Office Phone.: {dummyStatus.officePhone}</p>
                  </div>
                )}
              </div>
            )}
          </p>
        </div>
      </div>
    );
  }
}

export default Summary;
