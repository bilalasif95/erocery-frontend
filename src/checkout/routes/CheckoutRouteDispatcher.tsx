import * as React from "react";
import { generatePath, Redirect, RouteComponentProps } from "react-router";

import { useVariantsProducts } from "@sdk/react";

import * as paths from ".";
import { Loader } from "../../components";
import { CartContext } from "../../components/CartProvider/context";
import { CheckoutContext } from "../context";
import { CheckoutStep, useCheckoutStepState } from "../hooks";

export const CheckoutRouteDispatcher: React.FC<RouteComponentProps<{
  token?: string;
}>> = ({
  match: {
    params: { token },
  },
}) => {
  const {
    loading: checkoutLoading,
    checkout,
    cardData,
    dummyStatus,
  } = React.useContext(CheckoutContext);
  const { lines: cartLines } = React.useContext(CartContext);

  const {
    data: variantsProducts,
    loading: variantsProductsLoading,
  } = useVariantsProducts({
    ids: cartLines ? cartLines.map(line => line.variantId) : [],
  });

  const step = useCheckoutStepState(
    checkout,
    variantsProducts,
    cardData,
    dummyStatus
  );

  if (checkoutLoading || variantsProductsLoading || !step) {
    return <Loader />;
  }

  switch (step) {
    case CheckoutStep.BillingAddress:
      return <Redirect to={generatePath(paths.shippingAddressUrl, { token })} />;
    case CheckoutStep.ShippingAddress:
      return (
        <Redirect to={generatePath(paths.shippingAddressUrl, { token })} />
      );
    case CheckoutStep.Review:
      return <Redirect to={generatePath(paths.shippingAddressUrl, { token })} />;
    case CheckoutStep.Payment:
      return <Redirect to={generatePath(paths.shippingAddressUrl, { token })} />;
    case CheckoutStep.ShippingOption:
      return (
        <Redirect to={generatePath(paths.shippingAddressUrl, { token })} />
      );
  }
};
