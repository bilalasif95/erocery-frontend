import * as React from "react";

import { useLocalStorage } from "@hooks";
import { useAuth, useCheckoutDetails, useUserCheckout } from "@sdk/react";

import { BakraCheckoutContext, BakraCheckoutContextInterface } from "./context";

interface ProviderProps {
  children: React.ReactNode;
  user: {
    data: any;
    loading: boolean;
  };
}

export const BakraCheckoutProvider: React.FC<ProviderProps> = ({
  children,
  user,
}: ProviderProps) => {
  const { storedValue: token, setValue: setCheckoutToken } = useLocalStorage(
    "TocheckoutToken"
  );
  const [state, setState] = React.useState({
    cardData: null,
    checkout: null,
    dummyStatus: null,
    loading: !!token,
    shippingAsBilling: false,
    /**
     * Flag to determine, when the user checkout should be fetched from the
     * API and override the current, storred one - happens after user log in
     */
    syncUserCheckout: false,
    /**
     * Flag to determine, when the cart lines should override the checkout
     * lines - happens after user logs in
     */
    syncWithCart: false,
  });

  useAuth((authenticated: boolean) => {
    if (!authenticated) {
      clear();
    }
  });

  React.useEffect(() => {
    if (user.data && !state.syncUserCheckout) {
      setState(prevState => ({ ...prevState, syncUserCheckout: true }));
    }
  }, [user.data]);

  const update = (checkoutData: BakraCheckoutContextInterface) => {
    setState(prevState => ({
      ...prevState,
      ...checkoutData,
    }));
    if ("checkout" in checkoutData) {
      // setCheckoutToken(checkoutData.checkout.token);
      // checkoutToken not used
    }
  };

  const clear = () => {
    setState(prevState => ({
      ...prevState,
      cardData: null,
      checkout: null,
      dummyStatus: null,
      shippingAsBilling: false,
    }));
    setCheckoutToken(null);
  };

  const getContext = () => ({
    ...state,
    clear,
    update,
  });

  const skipUserCheckoutFetch = !state.syncUserCheckout && user.data;

  const { data: userCheckout, loading: userCheckoutLoading } = useUserCheckout({
    fetchPolicy: "network-only",
    skip: skipUserCheckoutFetch,
  });

  if (!userCheckoutLoading && !skipUserCheckoutFetch) {
    if (userCheckout && state.syncUserCheckout) {
      setState(prevState => ({
        ...prevState,
        checkout: userCheckout,
        loading: false,
        syncUserCheckout: false,
        syncWithCart: true,
      }));
      // setCheckoutToken(userCheckout.token);
    } else if (!userCheckout && state.syncUserCheckout) {
      setState(prevState => ({
        ...prevState,
        syncUserCheckout: false,
      }));
    }
  }

  const skipLocalStorageCheckoutFetch = !!(
    userCheckoutLoading ||
    user.loading ||
    !token ||
    state.checkout ||
    user.data
  );

  const { data: checkoutDetails } = useCheckoutDetails(
    {
      token,
    },
    { skip: skipLocalStorageCheckoutFetch }
  );

  if (checkoutDetails && !state.checkout && !skipLocalStorageCheckoutFetch) {
    setState(prevState => ({
      ...prevState,
      checkout: checkoutDetails,
      loading: false,
    }));
    // setCheckoutToken(checkoutDetails.token);
  }

  return (
    <BakraCheckoutContext.Provider value={getContext()}>
      {children}
    </BakraCheckoutContext.Provider>
  );
};
