import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
// import Nav from "./Nav";
import payment_methods from "../../images/Group_39.png";

// import easypaisa from "../../images/easypaisa.png";
// import facebook from "../../images/facebook.png";

// import instagram from "../../images/instagram.png";
// import jazzcash from "../../images/jazzcash.png";
import listIcon from "../../images/subcategories.svg";
// import twitter from "../../images/twitter.png";
// import youtube from "../../images/youtube.png";

import androidStoreImage from "../../images/playstore.png";

import appleStoreImage from "../../images/applestore.png";

const Footer: React.FC = () => (
  <div className="footer" id="footer">
    <div className="container">
      <div className="footer-list">
        <div className="footer-item">
          <h4>Help</h4>
          <ul className="quick-links">
            <li><Link to="/how-to-order"><ReactSVG path={listIcon} /><span>How to order?</span></Link></li>
            <li><Link to="/return-and-refunds"><ReactSVG path={listIcon} /><span>Return & Refund</span></Link></li>
            <li><Link to="/delivery"><ReactSVG path={listIcon} /><span>Delivery</span></Link></li>
            <li><Link to="/terms-and-conditions"><ReactSVG path={listIcon} /><span>Terms & Conditions</span></Link></li>
             <li><Link to="/privacy-policy"><ReactSVG path={listIcon} /><span>Privacy Policy</span></Link></li>
          </ul>
        </div>
        <div className="footer-item">
          <h4>Payment Methods</h4>
          <ul className="pay-method">
            {/* <li>
              <div className="cash-delivery">
                Cash Delivery
              </div>
            </li>
            <li><img src={easypaisa} /></li>
            <li><img src={jazzcash} /></li> */}
            <li><img src={payment_methods} /></li>
          </ul>
        </div>
        <div className="footer-item">
          <h4>Social Media</h4>
          <div className="social-media">
            {SOCIAL_MEDIA.map(medium => (
              <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
            ))}
          </div>
          <p className="whatsAppNumber">+92-330-2755559</p>
          <div className="apps">
            <h4>Download App</h4>
            <div className="social-media">
              <a href="https://play.google.com/store/apps/details?id=com.rns.erocery" target="_blank" rel="noopener noreferrer"><img className="androidAppStore" src={androidStoreImage}></img></a>
              <a href="https://www.apple.com/ios/app-store/" target="_blank" rel="noopener noreferrer"><img src={appleStoreImage}/></a>
            </div>
          </div>
          {/* <ul className="social-media">
            {SOCIAL_MEDIA.map(medium => (
              <li>
                <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
              </li>
            ))}
          </ul> */}
          {/* <ul className="social-media">
            <li><a href="https://www.facebook.com/Erocery-109977713975774/" target="_blank"><img src={facebook} /></a></li>
            <li><a href="https://twitter.com/rnssol" target="_blank"><img src={twitter} /></a></li>
            <li><a href="https://www.instagram.com/erocerypk" target="_blank"><img src={instagram} /></a></li>
            <li><a href="https://www.youtube.com/c/RNSSolutions" target="_blank"><img src={youtube} /></a></li>
          </ul> */}
        </div>
      </div>
      <div className="footer__favicons">
        <p>Copyright © 2020 Erocery, All Rights Reserved</p>
        {/* <p>Copyright © 2020 Erocery</p> */}

      </div>
    </div>
    {/* <Nav /> */}
  </div>
);

export default Footer;
