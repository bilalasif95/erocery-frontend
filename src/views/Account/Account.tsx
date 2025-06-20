import * as React from "react";
import Media from "react-responsive";
import { RouteComponentProps, withRouter } from "react-router";

import { useUserDetails } from "@sdk/react";
import { smallScreen } from "@styles/constants";
import AddressBook from "../../account/AddressBook/AddressBook";
import WishList from "../../wishlist/WishList/WishList";

import "./scss/index.scss";

import {
  accountUrl,
  addressBookUrl,
  homeUrl,
  orderHistoryUrl,
  paymentOptionsUrl,
  wishlistUrl,
} from "../../app/routes";

// import { AccountMenu, AccountMenuMobile } from "@components/molecules";
import { AccountMenu } from "@components/molecules";
import { AccountTab, OrdersHistory } from "@pages";
import { Breadcrumbs, Loader } from "../../components";

import { UserAllAddressesQuery } from "./queries";

const returnTab: any = (path: string, userDetails, history) => {
  let tabContent = <></>;
  switch (path) {
    case accountUrl: {
      tabContent = <AccountTab />;
      break;
    }
    case addressBookUrl: {
      tabContent = 
      <UserAllAddressesQuery>
        {({ data }) => (
        <AddressBook user={userDetails} />
        )}
      </UserAllAddressesQuery>;
      break;
    }
    case orderHistoryUrl: {
      tabContent = <OrdersHistory {...{ history }} />;
      break;
    }
    case wishlistUrl: {
      tabContent = <WishList />;
      break;
    }
  }
  return tabContent;
};

const Account: React.FC<RouteComponentProps> = ({ history, match }) => {
  const { data: user, loading } = useUserDetails();

  const links = [
    accountUrl,
    orderHistoryUrl,
    addressBookUrl,
    paymentOptionsUrl,
    wishlistUrl,
  ];

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    history.push(homeUrl);
  }

  return (
    <div>
    <div className="container">
      <Breadcrumbs breadcrumbs={[{ link: match.path, value: "My Account" }]} />
      <div className="account">
        <Media minWidth={smallScreen}>
          <div className="account__menu">
            <AccountMenu links={links} active={match.path} />
          </div>
        </Media>
        {/* <Media maxWidth={smallScreen - 1}>
          <div className="account__menu_mobile">
            <AccountMenuMobile links={links} active={match.path} />
          </div>
        </Media> */}
        <div className="account__content">
          {user && returnTab(match.path, user, history)}
        </div>
      </div>
    </div>
    </div>
  );
};

export default withRouter(Account);
