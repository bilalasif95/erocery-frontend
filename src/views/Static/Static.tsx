import "./scss/index.scss";

import * as React from "react";

const Static: React.FC = () => (
  <div className="homePage">
    <div className="mainHeading">
      <h3>Delivery Details:</h3>
    </div><br />
    <h4><b>Delivery time:</b></h4><br/>
    <p>
    Team Erocery aims to dispatch and deliver your orders within 3 working hours once the order is confirmed.<br/><br/>
    Once your order is confirmed you will receive a message and an email with your order details for confirmation. We request you to be available on the provided contact number so our team can reach you.<br/><br/>
    Due to the current lock down situation, delivery time may be affected.<br/><br/>
    Orders received on weekends and on Pakistan's National Holidays will be processed and shipped on the next working day.<br/><br/>
    </p>
    <h4><b>Delivery charges:</b></h4><br/>
    <p>
    We deliver without any charges for orders above Rs. 2000/-.<br/><br/>
    Standard delivery charges for orders below 2000/- will be charged based on the Payment method:<br/>
    a. Cash on delivery: Rupees 200/-.<br/>
    b. Online/Bank Transfer: Rupees 100/-.<br/><br/>
    </p>
    <h4><b>Order tracking:</b></h4><br/>
    <p>
    Once your order is dispatched you will receive a message and an email with order tracking number and link.<br/><br/>
    You can track your order on the website or our application with the tracking number or by simply clicking on the link.<br/><br/>
    If you do not receive any tracking information, please inform us at <u>contact@erocery.com</u>
    </p>
  </div>
);

export default Static;
