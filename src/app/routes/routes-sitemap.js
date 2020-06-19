import React from "react";
import { Route } from "react-router";
import * as paths from "./paths.ts";

export default (
  <Route>
    <Route path={"/category/:slug"} />
    <Route path={paths.howToOrderUrl} />
    <Route path={paths.returnAndRefundsUrl} />
    <Route path={paths.deliveryUrl} />
    <Route path={paths.termsAndConditionsUrl} />
    <Route path={paths.privacyPolicyUrl} />
  </Route>
);