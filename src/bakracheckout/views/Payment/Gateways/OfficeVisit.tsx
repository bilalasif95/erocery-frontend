// import classNames from "classnames";
import React from "react";

import { PROVIDERS } from "../../../../core/config";
import { ProviderProps } from "../View";

class OfficeVisit extends React.PureComponent<
  ProviderProps,
  {
    officeDetails: {
      officecAddress: string;
      officePhone: string;
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
    officeDetails: {
      officePhone: "",
      officecAddress: "",
      type: "OfficeVisit",
    },
    selectedStatus: this.statuses[2],
  };

  componentDidMount() {
    this.setState({
      officeDetails: {
        officePhone: this.props.paymentGatewayConfig[0].value,
        officecAddress: this.props.paymentGatewayConfig[1].value,
        type: "OfficeVisit",
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
          await update({ dummyStatus: this.state.officeDetails });
          processPayment(selectedStatus.token, PROVIDERS.OFFICEVISIT.label);
        }}
        className="c-option__content"
      >
        <div>
          <p>
            <span style={{ fontWeight: 900 }}>Office Address:&nbsp;</span>
            {paymentGatewayConfig[0].value}
          </p>
          <p>
            <span style={{ fontWeight: 900 }}>Office Phone.:&nbsp;</span>
            {paymentGatewayConfig[1].value}
          </p>
        </div>
      </form>
    );
  }
}

export default OfficeVisit;
