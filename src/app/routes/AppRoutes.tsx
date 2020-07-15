import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { CheckoutLogin, NotFound } from "../../components";
import UserAccount, * as accountPaths from "../../userAccount/routes";
// import { OrderDetails } from "../../userAccount/views";
const OrderDetails = React.lazy(() =>
  import("../../userAccount/views").then(({ OrderDetails }) => ({
    default: OrderDetails,
  }))
);
// import { Account, AccountConfirm } from "../../views/Account";
const Account = React.lazy(() =>
  import("../../views/Account").then(({ Account }) => ({
    default: Account,
  }))
);

const AccountConfirm = React.lazy(() =>
  import("../../views/Account").then(({ AccountConfirm }) => ({
    default: AccountConfirm,
  }))
);
// import { ArticlePage } from "../../views/Article";
const ArticlePage = React.lazy(() =>
  import("../../views/Article").then(({ ArticlePage }) => ({
    default: ArticlePage,
  }))
);
// import OrderGuide from "../../views/OrderGuide";
// import { CartPage } from "../../views/Cart";
const CartPage = React.lazy(() =>
  import("../../views/Cart").then(({ CartPage }) => ({
    default: CartPage,
  }))
);
// import { CategoryPage } from "../../views/Category";

const CategoryPage = React.lazy(() =>
  import("../../views/Category").then(({ CategoryPage }) => ({
    default: CategoryPage,
  }))
);

// import { CollectionPage } from "../../views/Collection";
const CollectionPage = React.lazy(() =>
  import("../../views/Collection").then(({ CollectionPage }) => ({
    default: CollectionPage,
  }))
);
// import Base from "../../views/FooterPages/Base";

// import Delivery from "../../views/FooterPages/Delivery";
const Delivery = React.lazy(() => import("../../views/FooterPages/Delivery"));
// import HowToOrder from "../../views/FooterPages/How-To-Order";
const HowToOrder = React.lazy(() =>
  import("../../views/FooterPages/How-To-Order")
);

// import JazzCashPaymentError from "../../views/FooterPages/JazzCashPaymentError";
const JazzCashPaymentError = React.lazy(() =>
  import("../../views/FooterPages/JazzCashPaymentError")
);

// import JazzCashPaymentSuccess from "../../views/FooterPages/JazzCashPaymentSuccess";

const JazzCashPaymentSuccess = React.lazy(() =>
  import("../../views/FooterPages/JazzCashPaymentSuccess")
);

// import PaymentError from "../../views/FooterPages/PaymentError";

const PaymentError = React.lazy(() =>
  import("../../views/FooterPages/PaymentError")
);

// import PaymentSuccess from "../../views/FooterPages/PaymentSuccess";

const PaymentSuccess = React.lazy(() =>
  import("../../views/FooterPages/PaymentSuccess")
);

// import PrivacyPolicy from "../../views/FooterPages/PrivacyPolicy";
const PrivacyPolicy = React.lazy(() =>
  import("../../views/FooterPages/PrivacyPolicy")
);

// import ReturnAndRefunds from "../../views/FooterPages/Return-And-Refunds";

const ReturnAndRefunds = React.lazy(() =>
  import("../../views/FooterPages/Return-And-Refunds")
);

// import TermsAndConditions from "../../views/FooterPages/Terms-And-Conditions";
const TermsAndConditions = React.lazy(() =>
  import("../../views/FooterPages/Terms-And-Conditions")
);

// import { HomePage } from "../../views/Home";
const HomePage = React.lazy(() =>
  import("../../views/Home").then(({ HomePage }) => ({ default: HomePage }))
);
// import OrderConfirmation from "../../views/OrderConfirmation/View";
const OrderConfirmation = React.lazy(() =>
  import("../../views/OrderConfirmation/View")
);
// import { ProductPage } from "../../views/Product";
const ProductPage = React.lazy(() =>
  import("../../views/Product").then(({ ProductPage }) => ({
    default: ProductPage,
  }))
);
// import { SearchPage } from "../../views/Search";
const SearchPage = React.lazy(() =>
  import("../../views/Search").then(({ SearchPage }) => ({
    default: SearchPage,
  }))
);

import { PasswordReset } from "@pages";

import * as paths from "./paths";

export const Routes: React.FC = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {/* <Route exact path={paths.baseUrl} component={Base} /> */}
      <Route exact path={paths.homeUrl} component={HomePage} />
      <Route path={paths.searchUrl} component={SearchPage} />
      <Route path={paths.categoryUrl} component={CategoryPage} />
      <Route path={paths.collectionUrl} component={CollectionPage} />
      <Route path={paths.productUrl} component={ProductPage} />
      <Route path={paths.cartUrl} component={CartPage} />
      <Route path={paths.checkoutLoginUrl} component={CheckoutLogin} />
      <Route path={paths.pageUrl} component={ArticlePage} />
      <Route path={accountPaths.baseUrl} component={UserAccount} />
      <Route path={accountPaths.userOrderDetailsUrl} component={OrderDetails} />
      <Route path={paths.guestOrderDetailsUrl} component={OrderDetails} />
      <Route path={paths.orderConfirmationUrl} component={OrderConfirmation} />
      <Route path={paths.accountUrl} component={Account} />
      <Route path={paths.accountConfirmUrl} component={AccountConfirm} />
      <Route path={paths.orderHistoryUrl} component={Account} />
      <Route path={paths.addressBookUrl} component={Account} />
      <Route path={paths.paymentOptionsUrl} component={Account} />
      <Route path={paths.wishlistUrl} component={Account} />
      <Route path={paths.passwordResetUrl} component={PasswordReset} />
      <Route path={paths.howToOrderUrl} component={HowToOrder} />
      <Route path={paths.returnAndRefundsUrl} component={ReturnAndRefunds} />
      <Route path={paths.deliveryUrl} component={Delivery} />
      <Route
        path={paths.termsAndConditionsUrl}
        component={TermsAndConditions}
      />
      <Route path={paths.privacyPolicyUrl} component={PrivacyPolicy} />
      <Route path={paths.paymentSuccessUrl} component={PaymentSuccess} />
      <Route path={paths.paymentErrorUrl} component={PaymentError} />
      <Route
        path={paths.jazzCashPaymentSuccessUrl}
        component={JazzCashPaymentSuccess}
      />
      <Route
        path={paths.jazzCashPaymentErrorUrl}
        component={JazzCashPaymentError}
      />
      <Route component={NotFound} />
      {/* <Route path={paths.orderGuideUrl} component={OrderGuide} /> */}
    </Switch>
  </React.Suspense>
);

export default Routes;
