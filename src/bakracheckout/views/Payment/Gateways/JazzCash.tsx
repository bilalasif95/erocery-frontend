// import classNames from "classnames";
import React from "react";

const crypto = require("crypto");

const HashKey = "h50t0u7wex";
let SortedArray = HashKey;
const Amount = 1 * 100;
const BillReference = "OrderID";
const Description = "Thank you for using Jazz Cash";
const DiscountedAmount = "";
const DiscountedBank = "";
const Language = "EN";
const MerchantID = "MC10199";
const Password = "0sz36zs8cu";
const ReturnURL = "http://192.168.100.132/response.php";
const TxnCurrency = "PKR";
const TxnDateTime: any = formatDate();
const TxnExpiryDateTime: any = formatDate(8);
const TxnRefNumber: any = "T".concat(formatDate());
const Version = "1.1";
const TxnType = "";
const PPMPF_1 = "";
const PPMPF_2 = "";
const PPMPF_3 = "";
const PPMPF_4 = "";
const PPMPF_5 = "";
const PostURL =
  "https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform";

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

// const request = JSON.parse(HashArray);

interface CompleteCheckoutProps {
  completeCheckout: () => any;
}

for (const hash of HashArray) {
  if (hash !== undefined && hash !== null && hash !== "") {
    SortedArray += "&" + hash;
  }
}

class JazzCash extends React.Component<CompleteCheckoutProps> {
  render() {
    const SecureHash = crypto
      .createHmac("sha256", HashKey)
      .update(SortedArray)
      .digest("hex")
      .toUpperCase();

    const { completeCheckout } = this.props;
    return (
      <div
      // ref={formRef}
      // onSubmit={async evt => {
      //   evt.preventDefault();
      //   await update({ dummyStatus: [] });
      //   processPayment(selectedStatus.token, PROVIDERS.RAZORPAY.label);
      // }}
      // className="c-option__content"
      >
        <form
          method="post"
          action={PostURL}
          target="_blank"
          onSubmit={() => completeCheckout()}
          id="subscription_order_form"
        >
          <input type="hidden" name="pp_Version" value={Version} />
          <input type="hidden" name="pp_TxnType" value={TxnType} />
          <input type="hidden" name="pp_Language" value={Language} />
          <input type="hidden" name="pp_MerchantID" value={MerchantID} />
          <input type="hidden" name="pp_SubMerchantID" value="" />
          <input type="hidden" name="pp_Password" value={Password} />
          <input type="hidden" name="pp_TxnRefNo" value={TxnRefNumber} />
          <input type="hidden" name="pp_Amount" value={Amount} />
          <input type="hidden" name="pp_TxnCurrency" value={TxnCurrency} />
          <input type="hidden" name="pp_TxnDateTime" value={TxnDateTime} />
          <input type="hidden" name="pp_BillReference" value={BillReference} />
          <input type="hidden" name="pp_Description" value={Description} />
          <input
            type="hidden"
            id="pp_DiscountedAmount"
            name="pp_DiscountedAmount"
            value={DiscountedAmount}
          />
          <input
            type="hidden"
            id="pp_DiscountBank"
            name="pp_DiscountBank"
            value={DiscountedBank}
          />
          <input
            type="hidden"
            name="pp_TxnExpiryDateTime"
            value={TxnExpiryDateTime}
          />
          <input type="hidden" name="pp_ReturnURL" value={ReturnURL} />
          <input type="hidden" name="pp_SecureHash" value={SecureHash} />
          <input type="hidden" name="ppmpf_1" value={PPMPF_1} />
          <input type="hidden" name="ppmpf_2" value={PPMPF_2} />
          <input type="hidden" name="ppmpf_3" value={PPMPF_3} />
          <input type="hidden" name="ppmpf_4" value={PPMPF_4} />
          <input type="hidden" name="ppmpf_5" value={PPMPF_5} />
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
      </div>
    );
  }
}

export default JazzCash;
