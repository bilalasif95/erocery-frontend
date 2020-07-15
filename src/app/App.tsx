import "../globalStyles/scss/index.scss";

import React from "react";
import { RouteComponentProps } from "react-router";
import ReactSVG from "react-svg";

import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import { isPath } from "../core/utils";
import { orderConfirmationUrl, Routes } from "./routes";

// import MessengerCustomerChat from "react-messenger-customer-chat";

import messengerImage from "../images/facebook-messenger-icon.svg";

// import { appId,pageId } from "../config/index";

const App: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname },
  },
}) => {
  const orderConfirmationPage = isPath(pathname, orderConfirmationUrl);

  return (
    <>
      <MetaConsumer />
      <header>
        <MainMenu/>
      </header>
      <Routes />
      {/* {window.innerWidth < 768 ?  */}
      <a target="_blank" rel="noopener noreferrer" className="messenger" href="https://www.m.me/109977713975774?source=customer_chat_plugin"><ReactSVG path={messengerImage} /></a>
      {/* : <MessengerCustomerChat pageId={pageId} appId={appId} /> } */}
      {!orderConfirmationPage && <Footer />}
      <OverlayManager />
    </>
  );
};

export default App;
