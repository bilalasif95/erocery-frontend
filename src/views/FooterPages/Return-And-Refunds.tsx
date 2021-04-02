import "./scss/index.scss";

import * as React from "react";

const ReturnAndRefunds: React.FC = () => (
  <div className="homePage">
    <div className="container">
      <div className="mainHeading">
        <h3>Return & Refund:</h3>
      </div><br />
      <p>Erocery guarantees the quality of products you order. However, if you wish to return any products, we are here at your service.</p><br />
      <h4><b>Terms and Conditions:</b></h4><br />
      <p>There are a few important things to keep in mind when returning a product you purchased from Erocery:<br />
       1. You have 3 calendar days to return or refund an item from the date you received it.<br />
       2. Only products that have been purchased directly from Erocery can be returned or refunded.<br />
       3. Only products that were damaged, defective, or incorrect at the time of delivery can be returned.<br />
       4. Refund can only be done if the product(s) sent to you is/are not as per your order.<br />
       5. Return or refund request will not be accepted if the item is “no longer needed”.<br />
       6. Please ensure that the product you're returning or refunding is repackaged and the original receipt is intact.<br />
       7. Products can not be returned or refunded if they are damaged.<br />
       8. Any product that has been opened will be ineligible for return or refund.<br />
       9. Products can not be returned or refunded if they have been used even once.<br />
       10. The discounted sale products cannot be returned or refunded.</p><br />
      <h4><b>Return and Refund:</b></h4><br />
      <p>
        For returning or refunding any of your purchased products please email us at <u>contact@erocery.com</u> and we will get back to you within 48 working hours (Monday to Friday).<br /><br />
    Our dedicated rider will collect your returning or refunding products from your home. Please note that the courier cost of returning or refunding the product will be borne by the customer.<br /><br />
    In case of refund, the amount will be refunded in the form of cash after the rider collects the product and quality is checked.<br /><br />
    If your return or refund request is not approved, you will be informed about the reason.
    </p>
    </div>
  </div>
);

export default ReturnAndRefunds;
