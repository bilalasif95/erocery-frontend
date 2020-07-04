// import classNames from "classnames";
import React from "react";

import { PROVIDERS } from "../../../../core/config";
import { ProviderProps } from "../View";

class Razorpay extends React.PureComponent<
  ProviderProps,
  {
    bankDetails: {
      accountName: string;
      accountTitle: string;
      bankName: string;
      branchCode: string;
      mobileno: string;
      type: string;
    };
    selectedStatus: { token: string; label: string };
  }
> {
  statuses = [
    { token: "charged", label: "Pay 25% advance" },
    { token: "fully-refunded", label: "Fully refunded" },
    { token: "not-charged", label: "Not charged" },
  ];
  state = {
    bankDetails: {
      accountName: "",
      accountTitle: "",
      bankName: "",
      branchCode: "",
      mobileno: "",
      type: "WireTransfer",
    },
    selectedStatus: this.statuses[2],
  };

  componentDidMount() {
    this.setState({
      bankDetails: {
        accountName: this.props.paymentGatewayConfig[1].value,
        accountTitle: this.props.paymentGatewayConfig[0].value,
        bankName: this.props.paymentGatewayConfig[2].value,
        branchCode: this.props.paymentGatewayConfig[3].value,
        mobileno: this.props.paymentGatewayConfig[4].value,
        type: "WireTransfer",
      },
    });
  }
  render() {
    const {
      // loading,
      formRef,
      processPayment,
      checkout: { update },
      paymentGatewayConfig,
    } = this.props;

    const { selectedStatus } = this.state;
    return (
      <form
        ref={formRef}
        onSubmit={async evt => {
          evt.preventDefault();
          await update({ dummyStatus: this.state.bankDetails });
          processPayment(selectedStatus.token, PROVIDERS.RAZORPAY.label);
        }}
        className="c-option__content"
      >
        <div>
          <p>
            <span style={{ fontWeight: 900 }}>Account Title:&nbsp;</span>
            {paymentGatewayConfig[0].value}
          </p>
          <p>
            <span style={{ fontWeight: 900 }}>Account No.:&nbsp;</span>
            {paymentGatewayConfig[1].value}
          </p>
          <p>
            <span style={{ fontWeight: 900 }}>Bank Name:&nbsp;</span>
            {paymentGatewayConfig[2].value}
          </p>
          <p>
            <span style={{ fontWeight: 900 }}>IBAN:&nbsp;</span>
            {paymentGatewayConfig[3].value}
          </p>
          <p>
            <span style={{ fontWeight: 900 }}>Branch Code:&nbsp;</span>
            {paymentGatewayConfig[4].value}
          </p>
        </div>
        {/* {this.statuses.map(({ token, label }) => {
          const selected = selectedStatus.token === token;
          return (
            <div
              key={token}
              className={classNames("c-option", {
                "c-option--disabled": loading,
                "c-option--selected": selected,
              })}
              onClick={() =>
                this.setState({ selectedStatus: { token, label } })
              }
            >
              <input type="radio" name="status" value={token} />
              <label>{label}</label>
            </div>
          );
        })} */}
      </form>
    );
  }
}

export default Razorpay;
