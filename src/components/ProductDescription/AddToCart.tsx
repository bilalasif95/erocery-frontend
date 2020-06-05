import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@temp/@next/components/atoms";

import { useUserDetails } from "@sdk/react";

import { baseUrl as checkoutUrl } from "../../checkout/routes";

import { CheckoutContext } from "../../checkout/context";
import { TypedCreateCheckoutMutation } from "../../checkout/queries";
import { CartLine } from "../CartProvider/context";

import AddToCartButton from "./AddToCartButton";
// import { classes } from "istanbul-lib-coverage";

const AddToCart: React.FC<{
  disabled: boolean;
  lines: CartLine[];
  onSubmit: () => void;
}> = ({ disabled, lines, onSubmit }) => {
  const { data: user } = useUserDetails();
  return (
    <CheckoutContext.Consumer>
      {({ checkout, update, loading: checkoutLoading }) => (
        <TypedCreateCheckoutMutation
          onCompleted={async ({ checkoutCreate: { checkout, errors } }) => {
            if (!errors.length) {
              await update({ checkout });
            }
            onSubmit();
          }}
        >
          {(createCheckout, { loading: mutationLoading }) => (
            <div className="buttonsFlex">
            <AddToCartButton
              className="product-description__action"
              onClick={() => {
                if (user && !checkout) {
                  createCheckout({
                    variables: {
                      checkoutInput: { phone: user.phone, lines },
                    },
                  });
                } else {
                  onSubmit();
                }
              }}
              disabled={disabled || mutationLoading }
          
            >
              Add to Cart
            </AddToCartButton>
            {disabled || mutationLoading || checkoutLoading ? 
            <Button
            className="buyButton"
            onClick={() => {
              if (user && !checkout) {
                createCheckout({
                  variables: {
                    checkoutInput: { phone: user.phone, lines },
                  },
                });
              } else {
                onSubmit();
              }
            }}
            disabled={disabled || mutationLoading || checkoutLoading}>
              Buy Now
            </Button> :
            <Link to={checkoutUrl} className="btnLink">
              <Button
              className="buyButton"
              onClick={() => {
                if (user && !checkout) {
                  createCheckout({
                    variables: {
                      checkoutInput: { phone: user.phone, lines },
                    },
                  });
                } else {
                  onSubmit();
                }
              }}
              disabled={disabled || mutationLoading || checkoutLoading}>
                Buy Now
              </Button>
            </Link>
            }
            </div>
          )}
        </TypedCreateCheckoutMutation>
      )}
    </CheckoutContext.Consumer>
  );
};

export default AddToCart;
