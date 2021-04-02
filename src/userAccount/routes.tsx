import React from "react";
import { Route, Switch } from "react-router-dom";

// import { NotFound } from "../components";

const NotFound = React.lazy(() =>
  import("../components").then(({ NotFound }) => ({ default: NotFound }))
);

// import { OrderDetails } from "./views";

const OrderDetails = React.lazy(() =>
  import("./views").then(({ OrderDetails }) => ({ default: OrderDetails }))
);

export const baseUrl = "/my-account/";
export const userOrderDetailsUrl = `order/:id/`;
export const orderHistoryUrl = `${baseUrl}order/history/`;

const Routes: React.FC = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route path={userOrderDetailsUrl} component={OrderDetails} />
      <Route component={NotFound} />
    </Switch>
  </React.Suspense>
);

export default Routes;
