import * as React from "react";
import { Route, Switch } from "react-router-dom";

// import { NotFound } from "../../components";
const NotFound = React.lazy(() =>
  import("../../components").then(({ NotFound }) => ({ default: NotFound }))
);

// import { Billing, Payment, Review, Shipping, ShippingOptions } from "../views";

const Billing = React.lazy(() =>
  import("../views").then(({ Billing }) => ({ default: Billing }))
);
const Payment = React.lazy(() =>
  import("../views").then(({ Payment }) => ({ default: Payment }))
);

const Review = React.lazy(() =>
  import("../views").then(({ Review }) => ({ default: Review }))
);

const Shipping = React.lazy(() =>
  import("../views").then(({ Shipping }) => ({ default: Shipping }))
);

const ShippingOptions = React.lazy(() =>
  import("../views").then(({ ShippingOptions }) => ({
    default: ShippingOptions,
  }))
);

// import { BakraCheckoutRouteDispatcher } from "./CheckoutRouteDispatcher";

const BakraCheckoutRouteDispatcher = React.lazy(() =>
  import(
    "./CheckoutRouteDispatcher"
  ).then(({ BakraCheckoutRouteDispatcher }) => ({
    default: BakraCheckoutRouteDispatcher,
  }))
);

import * as paths from ".";

export const CheckoutRoutes: React.FC = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
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
  </React.Suspense>
);
