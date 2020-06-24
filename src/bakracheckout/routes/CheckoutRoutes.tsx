import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { NotFound } from "../../components";
import { Billing, Payment, Review, Shipping, ShippingOptions } from "../views";
import { BakraCheckoutRouteDispatcher } from "./CheckoutRouteDispatcher";

import * as paths from ".";

export const CheckoutRoutes: React.FC = () => (
  <Switch>
    <Route
      exact
      path={paths.baseUrl}
      component={BakraCheckoutRouteDispatcher}
    />
    <Route path={paths.shippingAddressUrl} component={Shipping} />
    <Route path={paths.shippingOptionsUrl} component={ShippingOptions} />
    <Route path={paths.billingUrl} component={Billing} />
    <Route path={paths.paymentUrl} component={Payment} />
    <Route path={paths.reviewUrl} component={Review} />
    <Route component={NotFound} />
  </Switch>
);
