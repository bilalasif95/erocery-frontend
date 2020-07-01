import * as React from "react";
import { MutationFn } from "react-apollo";
import { generatePath, RouteComponentProps } from "react-router";

// import { Checkbox } from "@components/atoms";
// import { DiscountForm } from "@components/organisms";
// import {
//   useAddCheckoutPromoCode,
//   useRemoveCheckoutPromoCode,
// } from "@sdk/react";

import { Checkout_availablePaymentGateways_config } from "../../../checkout/types/Checkout";
import { Button } from "../../../components";
import { PROVIDERS } from "../../../core/config";
import { CartSummary, Option, Steps } from "../../components";
import {
  BakraCheckoutContext,
  BakraCheckoutContextInterface,
  CheckoutStep,
} from "../../context";
import { reviewUrl } from "../../routes";
import CreditCard from "./Gateways/Braintree/CreditCard";
// import Dummy from "./Gateways/Dummy";
import Razorpay from "./Gateways/Razorpay";
import { Stripe } from "./Gateways/Stripe";
import { TypedPaymentMethodCreateMutation } from "./queries";
import "./scss/index.scss";
import { createPayment, createPaymentVariables } from "./types/createPayment";

// import { CountryCode } from "types/globalTypes";

export interface ProviderProps {
  loading: boolean;
  formRef: React.RefObject<HTMLFormElement>;
  checkout: BakraCheckoutContextInterface;
  paymentGatewayConfig: Checkout_availablePaymentGateways_config[];
  paymentGatewayHref?: string;
  processPayment(token: string, gateway: string): Promise<void>;
  setLoadingState(loading: boolean): void;
}

const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
  history,
  match: {
    params: { token },
  },
}) => {
  const checkout = React.useContext(BakraCheckoutContext);

  const [loadingPayment, setLoadingPayment] = React.useState(false);
  const [selectedGeteway, setSelectedGeteway] = React.useState(null);
  // const [promoCodeFormVisible, setPromoCodeFormVisible] = React.useState(
  //   !!checkout.checkout.voucherCode
  // );

  const formRef = React.useRef<HTMLFormElement>(null);

  // const [
  //   addCheckoutPromoCode,
  //   { data: addedPromoCode, error: addedPromoCodeErrors },
  // ] = useAddCheckoutPromoCode();

  // const [
  //   removeCheckoutPromoCode,
  //   { data: removedPromoCode, error: removedPromoCodeErrors },
  // ] = useRemoveCheckoutPromoCode();

  // React.useEffect(() => {
  //   const updatedCheckout = addedPromoCode && addedPromoCode.checkout;

  //   if (updatedCheckout) {
  //     checkout.update({
  //       checkout: updatedCheckout,
  //     });
  //   }
  // }, [addedPromoCode]);

  // React.useEffect(() => {
  //   const updatedCheckout = removedPromoCode && removedPromoCode.checkout;

  //   if (updatedCheckout) {
  //     checkout.update({
  //       checkout: updatedCheckout,
  //     });
  //   }
  // }, [removedPromoCode]);

  // const setPromoCodeFormVisibleState = (event: React.SyntheticEvent) =>
  //   setPromoCodeFormVisible(prevVisibility => !prevVisibility);

  const setLoadingState = (loadingPayment: boolean) =>
    setLoadingPayment(loadingPayment);

  const proceedNext = (data: createPayment) => {
    const canProceed = !data.checkoutPaymentCreate.errors.length;

    if (canProceed) {
      setLoadingPayment(false);
      history.push(generatePath(reviewUrl, { token }));
    }
  };

  const makeProcessPayment = (
    createPaymentMethod: MutationFn<createPayment, createPaymentVariables>,
    checkout: BakraCheckoutContextInterface
  ) => async (token: string, gateway: string) => {
    const {
      checkout: { billingAddress, shippingAddress, totalPrice, id },
    } = checkout;

    if (token) {
      createPaymentMethod({
        variables: {
          checkoutId: id,
          input: {
            amount: totalPrice.gross.amount,
            billingAddress: {
              city:
                billingAddress === null
                  ? shippingAddress.city
                  : billingAddress.city,
              // country: billingAddress.country.code as CountryCode,
              countryArea:
                billingAddress === null
                  ? shippingAddress.countryArea
                  : billingAddress.countryArea,
              firstName:
                billingAddress === null
                  ? shippingAddress.firstName
                  : billingAddress.firstName,
              lastName:
                billingAddress === null
                  ? shippingAddress.lastName
                  : billingAddress.lastName,
              phone:
                billingAddress === null
                  ? shippingAddress.phone
                  : billingAddress.phone,
              // postalCode: billingAddress.postalCode,
              streetAddress1:
                billingAddress === null
                  ? shippingAddress.streetAddress1
                  : billingAddress.streetAddress1,
              streetAddress2:
                billingAddress === null
                  ? shippingAddress.streetAddress2
                  : billingAddress.streetAddress2,
            },
            gateway,
            token,
          },
        },
      });
    }
  };

  // const handleApplyDiscount = (
  //   checkout: BakraCheckoutContextInterface,
  //   discountCode: string
  // ) => {
  //   const {
  //     checkout: { id },
  //   } = checkout;

  //   addCheckoutPromoCode({
  //     checkoutId: id,
  //     promoCode: discountCode,
  //   });
  // };

  // const handleRemovePromoCode = (checkout: BakraCheckoutContextInterface) => {
  //   const {
  //     checkout: { id, voucherCode },
  //   } = checkout;

  //   removeCheckoutPromoCode({
  //     checkoutId: id,
  //     promoCode: voucherCode,
  //   });
  // };

  // let discountErrors = [];

  // const addPromoErrors =
  //   addedPromoCodeErrors &&
  //   addedPromoCodeErrors.extraInfo &&
  //   addedPromoCodeErrors.extraInfo.userInputErrors;
  // const removePromoErrors =
  //   removedPromoCodeErrors &&
  //   removedPromoCodeErrors.extraInfo &&
  //   removedPromoCodeErrors.extraInfo.userInputErrors;

  // if (addPromoErrors) {
  //   discountErrors = discountErrors.concat(addPromoErrors);
  // }
  // if (removePromoErrors) {
  //   discountErrors = discountErrors.concat(removePromoErrors);
  // }

  let statusReviewBtn = true;

  return (
    <CartSummary checkout={checkout.checkout}>
      <div className="checkout-payment">
        <Steps
          step={CheckoutStep.Payment}
          token={token}
          checkout={checkout.checkout}
        >
          {/* <Checkbox
            name="promo-code"
            checked={promoCodeFormVisible}
            onChange={setPromoCodeFormVisibleState}
          >
            Do you have a discount code?
          </Checkbox>
          {promoCodeFormVisible && (
            <div className="checkout-payment__discount-form">
              <DiscountForm
                discount={{ promoCode: checkout.checkout.voucherCode }}
                handleApplyDiscount={discountCode =>
                  handleApplyDiscount(checkout, discountCode)
                }
                handleRemovePromoCode={() => handleRemovePromoCode(checkout)}
                errors={discountErrors}
              />
            </div>
          )} */}
          <TypedPaymentMethodCreateMutation onCompleted={proceedNext}>
            {(createPaymentMethod, { loading: paymentCreateLoading }) => {
              const { availablePaymentGateways } = checkout.checkout;
              const processPayment = makeProcessPayment(
                createPaymentMethod,
                checkout
              );
              const loading = loadingPayment || paymentCreateLoading;
              const optionProps = providerName => ({
                key: providerName,
                onSelect: () => setSelectedGeteway(providerName),
                selected: selectedGeteway === providerName,
                value: providerName,
              });
              const providerProps = {
                checkout,
                formRef,
                loading,
                processPayment,
                setLoadingState,
              };

              return (
                <div className="checkout-payment__form">
                  {availablePaymentGateways.map(provider => {
                    console.log(provider, "prooooooooooo");
                    const providerName = provider.name;
                    const paymentGatewayProps = {
                      ...providerProps,
                      paymentGatewayConfig: provider.config,
                    };
                    {
                      optionProps(providerName).selected
                        ? (statusReviewBtn = false)
                        : (statusReviewBtn = true);
                    }
                    switch (providerName) {
                      case PROVIDERS.BRAINTREE.label:
                        return (
                          <Option
                            label="Credit Card"
                            {...optionProps(providerName)}
                          >
                            <CreditCard {...paymentGatewayProps} />
                          </Option>
                        );

                      // case PROVIDERS.DUMMY.label:
                      //   return (
                      //     <Option
                      //       label="Cash on Delivery"
                      //       {...optionProps(providerName)}
                      //     >
                      //       <Dummy {...paymentGatewayProps} />
                      //     </Option>
                      //   );

                      case PROVIDERS.RAZORPAY.label:
                        return (
                          <Option
                            label="Wire Transfer"
                            {...optionProps(providerName)}
                          >
                            <Razorpay {...paymentGatewayProps} />
                          </Option>
                        );
                      case PROVIDERS.STRIPE.label:
                        return (
                          <Option label="Stripe" {...optionProps(providerName)}>
                            <Stripe
                              {...paymentGatewayProps}
                              paymentGatewayHref={PROVIDERS.STRIPE.href}
                            />
                          </Option>
                        );
                    }
                  })}

                  <div>
                    <Button
                      type="submit"
                      disabled={loading || statusReviewBtn}
                      onClick={() => {
                        formRef.current.dispatchEvent(
                          new Event("submit", { cancelable: true })
                        );
                      }}
                    >
                      Continue to Review Your Order
                    </Button>
                  </div>
                </div>
              );
            }}
          </TypedPaymentMethodCreateMutation>
        </Steps>
      </div>
    </CartSummary>
  );
};

export default View;
