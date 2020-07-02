// import classNames from "classnames";
import React from "react";

import { PROVIDERS } from "../../../../core/config";
import { ProviderProps } from "../View";

class JazzCash extends React.PureComponent<
  ProviderProps,
  {
    selectedStatus: { token: string; label: string };
  }
> {
  statuses = [
    { token: "partial", label: "Pay 25% advance" },
    { token: "fully-refunded", label: "Fully refunded" },
    { token: "not-charged", label: "Not charged" },
  ];
  state = {
    selectedStatus: this.statuses[2],
  };

  render() {
    const {
      // loading,
      formRef,
      processPayment,
      checkout: { update },
      //   paymentGatewayConfig,
    } = this.props;

    const { selectedStatus } = this.state;
    return (
      <form
        ref={formRef}
        onSubmit={async evt => {
          evt.preventDefault();
          await update({ dummyStatus: "JazzCash" });
          processPayment(selectedStatus.token, PROVIDERS.JAZZCASH.label);
        }}
        className="c-option__content"
      >
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

export default JazzCash;
