import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { NavLink,SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
// import Nav from "./Nav";
import payment_methods from "../../images/Group_39.png";

import { TypedSecondaryMenuQuery } from "./queries";

// import easypaisa from "../../images/easypaisa.png";
// import facebook from "../../images/facebook.png";
// import instagram from "../../images/instagram.png";
// import jazzcash from "../../images/jazzcash.png";
import listIcon from "../../images/subcategories.svg";
// import twitter from "../../images/twitter.png";
// import youtube from "../../images/youtube.png";

import androidStoreImage from "../../images/playstore.png";

import appleStoreImage from "../../images/applestore.png";

const Footer: React.FC = () => {
  const [readMore,setReadMore] = React.useState(false);
  return (
  <div className="footer" id="footer">
    <div className="container">
      <div className="seoTagLine">
        Erocery Online Grocery Store: We deliver best quality grocery online in Rawalpindi and Islamabad. In future, we will be serving in Sargodha,&nbsp;{!readMore && <button className="showButton" onClick={()=>setReadMore(true)}>Show More</button>}{readMore && "Karachi and Lahore."}<br/><br/>
      </div>
      {readMore && (
        <div className="seoTagLine">
          <p>We provide Safe and Secure Payment methods and competitive prices from the market. We also offer open box delivery.<br /><br />
          We offer the ease of cash on delivery and also offer Jazz Cash and Easy Paisa payment methods. Combine this with the best rates directly from the market, you save yourself from transportation charges, the need to bargain and a scorching sun. Don't like an item or two (you think they aren't in good quality, the box seems to be damaged, expiry or any other issue), you can return and get a refund of your money at your doorstep without any hassles. Our officer on service will open all the boxes for you so you can check and verify each item before receiving.<br /><br />
          We offer the following products:<br />
          &nbsp;&nbsp;-&nbsp;&nbsp;Kitchen, Laundry and Cleaning Products: We offer 100% safe grocery services, this also includes items required to clean your house and do other chores.<br />
          &nbsp;&nbsp;-&nbsp;&nbsp;Baby Care Products and Baby Food: Mothers don't need to travel for food, lotions and diapers anymore; we provide you with the ease of taking care of your kids with just a few click.<br />
          &nbsp;&nbsp;-&nbsp;&nbsp;Pulses, Rice, Edible Oils and Masalas: Daals (Pulses and Lentils), Beans (Channa and Lobia), Rice, Edible Oils, you name it, we have it. We also have a wide range of National and Shan masalas to provide you with the best quality items so you can cook with great ease.<br />
          &nbsp;&nbsp;-&nbsp;&nbsp;Beverages and Mineral Water: Related products available at Erocery.com, you just order them and we deliver your needed items at your door step within few hours’ delivery.<br />
          &nbsp;&nbsp;-&nbsp;&nbsp;Biscuits, Snacks, Bread and Eggs: These products are available at our warehouse, best quality products and competitive prices from the market.<br />
          &nbsp;&nbsp;-&nbsp;&nbsp;Body Soap, Hand Wash and Sanitizer:  We have all kind of soaps and sanitizers that help you to protect yourself from germs. We have the best quality products at lowest prices from the market.<br />
          &nbsp;&nbsp;-&nbsp;&nbsp;Canned Food, Ketchup and Sauces: We have different kinds of canned foods, such as Del Monte Cocktail, Del Monte Pineapple Slice and Mitchel’s Sweet Corn available at best quality and prices.<br/><br/>
          One stop shop for all your daily needs.<br /><br/>
          Erocery is the best online supermarket that allows you to order products across categories like grocery, hygiene & wellness, household care; baby care etc. and gets them delivered to your doorstep.<br /><br/>
          Erocery is the best online supermarket that allows you to order products across categories like grocery, hygiene & wellness, household care; baby care etc. and gets them delivered to your doorstep.<br /><br/>
          The delivery service is operational in more than 150 areas of Rawalpindi and Islamabad.&nbsp;
          {readMore && <button className="showButton" onClick={()=>setReadMore(false)}>Show Less</button>}
          </p>
        </div>
      )}
      <div className="footer-list">
        <div className="footer-item">
          <h4>Help</h4>
          <ul className="quick-links">
            <TypedSecondaryMenuQuery>
              {({ data }) => {
                return data.shop.navigation.secondary.items.map(item => (
                  <>
                  {/* {item.children.map(subItem => ( */}
                    <li key={item.id}><ReactSVG path={listIcon} /><NavLink item={item}></NavLink></li>
                  {/* <li><Link to="/return-and-refunds"><ReactSVG path={listIcon} /><span>Return & Refund</span></Link></li>
                  <li><Link to="/delivery"><ReactSVG path={listIcon} /><span>Delivery</span></Link></li>
                  <li><Link to="/terms-and-conditions"><ReactSVG path={listIcon} /><span>Terms & Conditions</span></Link></li>
                  <li><Link to="/privacy-policy"><ReactSVG path={listIcon} /><span>Privacy Policy</span></Link></li>
                  ))} */}
                  </>
                ));
              }}
            </TypedSecondaryMenuQuery>
            <li><ReactSVG path={listIcon} /><Link to={"/blogs"}>Blogs</Link></li>
          </ul>
        </div>
        <div className="footer-item">
          <div>
            <h4>Contact Us</h4>
            <ul className="quick-links">
              <li className="contactUsLinks"><span className="contactUsLinksSpanOne">Phone:</span><span className="contactUsLinksSpanTwo">+92-330-2755559</span></li>
              <li className="contactUsLinks"><span className="contactUsLinksSpanOne">Email:</span><span className="contactUsLinksSpanTwo">contact@erocery.com</span></li>
              <li className="contactUsLinks"><span className="contactUsLinksSpanOne">Address:</span><span className="contactUsLinksSpanTwo">Office #1b, 3rd Floor, Al-Rahim Arcade, National Market,
Satellite Town, Rawalpindi, Pakistan.</span></li>
            </ul>
          </div>
          
            {/* <li>
              <div className="cash-delivery">
                Cash Delivery
              </div>
            </li>
            <li><img src={easypaisa} /></li>
            <li><img src={jazzcash} /></li> */}
        </div>
        <div className="footer-item">
          <h4 className="socialMediaHeading">Social Media</h4>
          <div className="social-media">
            {SOCIAL_MEDIA.map(medium => (
              <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
            ))}
          </div>
          <h4>Payment Methods</h4>
          <ul className="pay-method">
            <li><img src={payment_methods} alt="Jazz cash, Jazz cash account" /></li>
          </ul>
          {/* <p className="whatsAppNumber">+92-330-2755559</p> */}
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
        <div className="footer-item">
          <div>
            <h4>Download App</h4>
            <div className="playstoreIcons">
              <a className="googlePlayStoreIcon" href="https://play.google.com/store/apps/details?id=com.rns.erocery" target="_blank" rel="noopener noreferrer"><img className="androidAppStore" alt="android store" src={androidStoreImage}></img></a>
              <a href="https://apps.apple.com/us/app/id1524601380" target="_blank" rel="noopener noreferrer"><img alt="apple store" src={appleStoreImage}/></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__favicons">
        <p>Copyright © 2020 Erocery, All Rights Reserved</p>
        <p className="poweredBy">Powered By <u><a href="https://rnssol.com/" target="_blank" rel="noopener noreferrer">RNS Solutions</a></u></p>
      </div>
    </div>
    {/* <Nav /> */}
  </div>
  )
};

export default Footer;
