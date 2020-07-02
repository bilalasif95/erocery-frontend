// import classNames from "classnames";
import React from "react";

const crypto = require("crypto");

interface CompleteCheckoutProps {
  completeCheckout: () => any;
  paymentAmount: any;
  hashArr: any;
  hashKey: string;
  sortedArray: any;
  postUrl: string;
}

class JazzCash extends React.Component<CompleteCheckoutProps> {
  render() {
    const {
      completeCheckout,
      hashKey,
      sortedArray,
      postUrl,
      hashArr,
    } = this.props;

    const SecureHash = crypto
      .createHmac("sha256", hashKey)
      .update(sortedArray)
      .digest("hex")
      .toUpperCase();

    return (
      <form
        method="post"
        action={postUrl}
        // target="_blank"
        onSubmit={() => completeCheckout()}
        id="subscription_order_form"
      >
        <input type="hidden" name="pp_Version" value={hashArr[14]} />
        <input type="hidden" name="pp_TxnType" value={hashArr[13]} />
        <input type="hidden" name="pp_Language" value={hashArr[5]} />
        <input type="hidden" name="pp_MerchantID" value={hashArr[6]} />
        <input type="hidden" name="pp_SubMerchantID" value="" />
        <input type="hidden" name="pp_Password" value={hashArr[7]} />
        <input type="hidden" name="pp_TxnRefNo" value={hashArr[12]} />
        <input type="hidden" name="pp_Amount" value={hashArr[0]} />
        <input type="hidden" name="pp_TxnCurrency" value={hashArr[9]} />
        <input type="hidden" name="pp_TxnDateTime" value={hashArr[10]} />
        <input type="hidden" name="pp_BillReference" value={hashArr[1]} />
        <input type="hidden" name="pp_Description" value={hashArr[2]} />
        <input
          type="hidden"
          id="pp_DiscountedAmount"
          name="pp_DiscountedAmount"
          value={hashArr[3]}
        />
        <input
          type="hidden"
          id="pp_DiscountBank"
          name="pp_DiscountBank"
          value={hashArr[4]}
        />
        <input type="hidden" name="pp_TxnExpiryDateTime" value={hashArr[11]} />
        <input type="hidden" name="pp_ReturnURL" value={hashArr[8]} />
        <input type="hidden" name="pp_SecureHash" value={SecureHash} />
        <input type="hidden" name="ppmpf_1" value={hashArr[15]} />
        <input type="hidden" name="ppmpf_2" value={hashArr[16]} />
        <input type="hidden" name="ppmpf_3" value={hashArr[17]} />
        <input type="hidden" name="ppmpf_4" value={hashArr[18]} />
        <input type="hidden" name="ppmpf_5" value={hashArr[19]} />
        <input
          type="submit"
          name="Jazz Cash"
          value="Place Your Order"
          style={{
            backgroundColor: "#5fbe43",
            border: "none",
            borderRadius: "7px",
            boxShadow: "-5px 5px 14px 0px rgba(0, 0, 0, 0.2)",
            color: "white",
            cursor: "pointer",
            //   display: "none",
            fontFamily: "Inter, sans-serif",
            outline: "none",
            padding: "0.9rem 3.7rem",
            textTransform: "uppercase",
            transition: "0.3s",
          }}
        />
      </form>
    );
  }
}

export default JazzCash;
