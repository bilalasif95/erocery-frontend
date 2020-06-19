import "./scss/index.scss";

import * as React from "react";

const HowToOrder: React.FC = () => (
   <div className="homePage">
      <div className="container">
         <div className="mainHeading">
            <h3>How to Order?</h3>
         </div><br />
         <p>Thank you for your interest in Erocery.<br />
       We sell grocery products online and deliver your order at your doorstep.</p><br />
         <h4><b>You may order online by:</b></h4><br />
         <p>1. Creating an account<br />
       2. Without creating an account</p><br />
         <h4><b>1. Creating an account:</b></h4><br />
         <p>Step 1: Create your account by signing in with the required information.<br />
       Step 2: Choose the products you wish to buy by adding them in your shopping cart.<br />
       Step 3: Click on the cart and review your order and its details.<br />
       Step 4: Place order.</p><br />
         <h4><b>2. Without creating an account:</b></h4><br />
         <p>Step 1: Choose the products you wish to buy by adding them in your shopping cart.<br />
       Step 2: Click on the cart and review your order and its details.<br />
       Step 3: Go to checkout.<br />
       Step 4: Provide the required details on the form.<br />
       Step 5: Place order.</p><br />
         <p>After the order has been placed, you will receive a confirmation message and email on your provided contact information.</p><br />
         <p>For further queries feel free to contact us on: <u>erocery@gmail.com</u></p>
      </div>
   </div>
);

export default HowToOrder;
