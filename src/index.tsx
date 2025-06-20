import { hot } from "react-hot-loader";
import { ThemeProvider } from "styled-components";

import { NotificationTemplate } from "@components/atoms";
import {
  ServiceWorkerContext,
  ServiceWorkerProvider,
} from "@components/containers";
import {
  SaleorProvider,
  useAuth,
  useUserDetails,
  WishlistProvider,
} from "@sdk/react";
import { defaultTheme, GlobalStyle } from "@styles";

import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";

import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import * as React from "react";
import { positions, Provider as AlertProvider, useAlert } from "react-alert";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

// import { App } from "./app";

const App = React.lazy(() =>
  import("./app").then(({ App }) => ({
    default: App,
  }))
);
// import { BakraCheckoutApp } from "./bakracheckout";

const BakraCheckoutApp = React.lazy(() =>
  import("./bakracheckout").then(({ BakraCheckoutApp }) => ({
    default: BakraCheckoutApp,
  }))
);

import { BakraCheckoutProvider } from "./bakracheckout/CheckoutProvider";
import { BakraCheckoutContext } from "./bakracheckout/context";
import { baseUrl as bakracheckoutBaseUrl } from "./bakracheckout/routes";

// import { CheckoutApp } from "./checkout";

const CheckoutApp = React.lazy(() =>
  import("./checkout").then(({ CheckoutApp }) => ({
    default: CheckoutApp,
  }))
);

import { CheckoutProvider } from "./checkout/CheckoutProvider";
import { CheckoutContext } from "./checkout/context";
import { baseUrl as checkoutBaseUrl } from "./checkout/routes";
import { apiUrl, serviceWorkerTimeout } from "./constants";

import { gtmId } from "../src/config";

import { history } from "./history";

import TagManager from "react-gtm-module";

import { OverlayProvider, UserProvider } from "./components";

import CartProvider from "./components/CartProvider";
import ShopProvider from "./components/ShopProvider";

import {
  authLink,
  invalidTokenLinkWithTokenHandlerComponent,
} from "./core/auth";

Bugsnag.start({
  apiKey: "e166e1d65552b0b013b02a57b255d071",
  plugins: [new BugsnagPluginReact()],
});

const { link: invalidTokenLink } = invalidTokenLinkWithTokenHandlerComponent(
  UserProvider
);

const tagManagerArgs = {
  gtmId,
};

TagManager.initialize(tagManagerArgs);

const link = ApolloLink.from([
  invalidTokenLink,
  authLink,
  new RetryLink(),
  new BatchHttpLink({ uri: apiUrl }),
]);

const cache = new InMemoryCache({
  dataIdFromObject: obj => {
    if (obj.__typename === "Shop") {
      return "shop";
    }
    return defaultDataIdFromObject(obj);
  },
});

const startApp = async () => {
  await persistCache({
    cache,
    storage: window.localStorage,
  });

  const apolloClient = new ApolloClient({
    cache,
    link,
  });

  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500,
  };

  const Root = hot(module)(() => {
    const Notifications = () => {
      const alert = useAlert();

      const { updateAvailable } = React.useContext(ServiceWorkerContext);

      React.useEffect(() => {
        if (updateAvailable) {
          alert.show(
            {
              actionText: "Refresh",
              content:
                "To update the application to the latest version, please refresh the page!",
              title: "New version is available!",
            },
            {
              onClose: () => {
                location.reload();
              },
              timeout: 0,
              type: "success",
            }
          );
        }
      }, [updateAvailable]);

      useAuth((authenticated: boolean) => {
        if (authenticated) {
          alert.show(
            {
              title: "You are now logged in",
            },
            { type: "success" }
          );
        } else {
          alert.show(
            {
              title: "You are now logged out",
            },
            { type: "success" }
          );
        }
      });
      return null;
    };

    const BakraCheckout = ({ children }) => {
      const user = useUserDetails();
      return (
        <>
          <BakraCheckoutProvider user={user}>{children}</BakraCheckoutProvider>
        </>
      );
    };

    const Checkout = ({ children }) => {
      const user = useUserDetails();
      return (
        <>
          <CheckoutProvider user={user}>{children}</CheckoutProvider>
        </>
      );
    };

    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <ApolloProvider client={apolloClient}>
              <SaleorProvider client={apolloClient}>
                <ShopProvider>
                  <OverlayProvider>
                    <Checkout>
                      <CheckoutContext.Consumer>
                        {checkout => (
                          <CartProvider
                            checkout={checkout}
                            apolloClient={apolloClient}
                          >
                            <BakraCheckout>
                              <BakraCheckoutContext.Consumer>
                                {bakracheckout => (
                                  <WishlistProvider>
                                    <Switch>
                                      <Route
                                        path={checkoutBaseUrl}
                                        component={CheckoutApp}
                                      />
                                      <Route
                                        path={bakracheckoutBaseUrl}
                                        component={BakraCheckoutApp}
                                      />
                                      <Route component={App} />
                                    </Switch>
                                    <Notifications />
                                  </WishlistProvider>
                                )}
                              </BakraCheckoutContext.Consumer>
                            </BakraCheckout>
                          </CartProvider>
                        )}
                      </CheckoutContext.Consumer>
                    </Checkout>
                  </OverlayProvider>
                </ShopProvider>
              </SaleorProvider>
            </ApolloProvider>
          </QueryParamProvider>
        </Router>
      </React.Suspense>
    );
  });

  const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

  render(
    <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
        <AlertProvider
          template={NotificationTemplate as any}
          {...notificationOptions}
        >
          <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
            <GlobalStyle />
            <Root />
          </ServiceWorkerProvider>
        </AlertProvider>
      </ThemeProvider>
    </ErrorBoundary>,
    document.getElementById("root")
  );

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept();
  }
};

startApp();
