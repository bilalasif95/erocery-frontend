import "../globalStyles/scss/index.scss";

import React from "react";
import { RouteComponentProps } from "react-router";
import ReactSVG from "react-svg";

import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import { isPath } from "../core/utils";
import { orderConfirmationUrl, Routes } from "./routes";

// import MessengerCustomerChat from "react-messenger-customer-chat";

import messengerImage from "../images/facebook-messenger-icon.svg";
import closeImg from "../images/x.svg";
// import { appId,pageId } from "../config/index";

const App: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname },
  },
}) => {
  const orderConfirmationPage = isPath(pathname, orderConfirmationUrl);
  const [offerBox,setOfferBox] = React.useState(false);
  const [offerMobileBox,setMobileOfferBox] = React.useState(true);
  React.useEffect(()=>{
    setTimeout(()=> {
      setOfferBox(true)
    },1000)
  },[])
  return (
    <>
      <MetaConsumer />
      <header>
        <MainMenu/>
      </header>
      <Routes />
      {/* {window.innerWidth < 768 ?  */}
      <a target="_blank" rel="noopener noreferrer" className="messenger" href="https://www.m.me/109977713975774?source=customer_chat_plugin"><ReactSVG path={messengerImage} /></a>
      {window.innerWidth > 768 && offerBox && 
          <div className="offer">
            <div className="close">
              <div className="inner">
                <div className="dottedBorder">
                  <p>Limited Time Offer:</p>
                  <p className="offOnStock">2% Off</p>
                  <p>on Entire Stock.</p>
                </div>
              </div>
              <ReactSVG className="closeSVG" onClick={()=> setOfferBox(false)} path={closeImg} />
            </div>
          </div>
      }
      {window.innerWidth < 768 && offerMobileBox &&
        <div className="mobileOffer">
          <div className="content">
            <div className="close">
              <div className="inner">
                <div className="dottedBorder">
                  <p>Limited Time Offer:</p>
                  <p className="offOnStock">2% Off</p>
                  <p>on Entire Stock.</p>
                </div>
              </div>
              <ReactSVG className="closeSVG" onClick={()=> setMobileOfferBox(false)} path={closeImg} />
            </div>
          </div>
        </div>
      }
      {/* : <MessengerCustomerChat pageId={pageId} appId={appId} /> } */}
      {!orderConfirmationPage && <Footer />}
      <OverlayManager />
    </>
  );
};

export default App;
