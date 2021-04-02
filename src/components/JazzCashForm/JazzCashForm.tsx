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
const ReturnURL = "http://localhost/response.php";
const TxnCurrency = "PKR";
const TxnDateTime = "20200701104530"; // new Date('YmdHis')
const TxnExpiryDateTime = "20200709104530"; // new Date('YmdHis')
const TxnRefNumber = "T20200701104530"; // new Date('YmdHis')
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

// const request = JSON.parse(HashArray);

for (const hash of HashArray) {
  if (hash !== undefined && hash !== null && hash !== "") {
    SortedArray += "&" + hash;
  }
}
const SecureHash = crypto
  .createHmac("sha256", HashKey)
  .update(SortedArray)
  .digest("hex")
  .toUpperCase();

const JazzCashForm = () => {
  return (
    <form method="post" action={PostURL}>
      <p>{JSON.stringify(SortedArray)} aaaaa</p>
      <p> {JSON.stringify(SecureHash)}</p>
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

      <input type="submit" name="Jazz Cash" value="Jazz Cash" />
    </form>
  );
};
export default JazzCashForm;
