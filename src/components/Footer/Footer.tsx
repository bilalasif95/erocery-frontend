import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
// import ReactSVG from "react-svg";
// import { SocialMediaIcon } from "..";
// import { SOCIAL_MEDIA } from "../../core/config";
// import Nav from "./Nav";


import easypaisa from "../../images/easypaisa.png";
import facebook from "../../images/facebook.png";
import arrowLink from "../../images/footerArrow.png";
import instagram from "../../images/instagram.png";
import jazzcash from "../../images/jazzcash.png";

import twitter from "../../images/twitter.png";
import youtube from "../../images/youtube.png";

const Footer: React.FC = () => (
  <div className="footer" id="footer">
    <div className="container">
      <div className="footer-list">
        <div className="footer-item">
          <h4>Help</h4>
          <ul className="quick-links">
            <li><Link to="#"><img src={arrowLink} /><span>How to order</span></Link></li>
            <li><Link to="#"><img src={arrowLink} /><span>Return & Refunds</span></Link></li>
            <li><Link to="#"><img src={arrowLink} /><span>Delivery</span></Link></li>
            <li><Link to="#"><img src={arrowLink} /><span>Terms & Conditions</span></Link></li>
          </ul>
        </div>
        <div className="footer-item">
          <h4>Payment Methods</h4>
          <ul className="pay-method">
            <li><Link to="#">
              <div className="cash-delivery">
                Cash Delivery
              </div>
              </Link></li>
            <li><Link to="#"><img src={easypaisa} /></Link></li>
            <li><Link to="#"><img src={jazzcash} /></Link></li>
          </ul>
        </div>
        <div className="footer-item">
          <h4>Social Media</h4>
          {/* <div className="social-media">
          {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
          </div> */}
          <ul className="social-media">
            <li><a href="https://www.facebook.com/Erocery-109977713975774/" target="_blank"><img src={facebook} /></a></li>
            <li><a href="https://twitter.com/rnssol" target="_blank"><img src={twitter} /></a></li>
            <li><a href="https://www.instagram.com/erocerypk" target="_blank"><img src={instagram} /></a></li>
            <li><a href="https://www.youtube.com/c/RNSSolutions" target="_blank"><img src={youtube} /></a></li>
          </ul>
        </div>
      </div>
      <div className="footer__favicons">
        <p>Erocery.com 2020. All Rights Reserved.</p>
        {/* <p>Copyright © 2020 Erocery</p> */}
       
      </div>
    </div>
    {/* <Nav /> */}
  </div>
);

export default Footer;
