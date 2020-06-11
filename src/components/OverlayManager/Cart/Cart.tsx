import "./scss/index.scss";

import * as React from "react";
import { generatePath, Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { useUserDetails } from "@sdk/react";

import {
  Button,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import { cartUrl, checkoutLoginUrl } from "../../../app/routes";
import { baseUrl as checkoutUrl } from "../../../checkout/routes";
import { maybe } from "../../../core/utils";
import { TypedProductVariantsQuery } from "../../../views/Product/queries";
import { CartContext } from "../../CartProvider/context";
import { extractCartLines, getTotal } from "../../CartProvider/utils";
import { Error } from "../../Error";
// import Loader from "../../Loader";
import { ShopContext } from "../../ShopProvider/context";
import Empty from "./Empty";
import ProductList from "./ProductList";

import cartImg from "../../../images/cart.svg";
import closeImg from "../../../images/x.svg";

import { VerifyTokenAuthMutation } from "../../User/queries";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const { data: user } = useUserDetails();
  const tok = window.localStorage.getItem("token");
  const [userAvailable, setUserAvailable] = React.useState(tok ? false : true);
  let tokenVerifyFunction = true;
  return (
    <Overlay context={overlay}>
      <Online>
        <CartContext.Consumer>
          {cart => (
            <ShopContext.Consumer>
              {({ defaultCountry, geolocalization }) => (
                <VerifyTokenAuthMutation
                  onCompleted={async res => setUserAvailable(res.tokenVerify.user.isActive)}
                >
                  {(tokenVerify) => {
                    if(tokenVerifyFunction){
                      tokenVerifyFunction = false;
                      tokenVerify({
                        variables: { token: tok },
                      })
                    }
                    return(
                      <TypedProductVariantsQuery
                        displayLoader={false}
                        variables={{ ids: cart.lines.map(line => line.variantId) }}
                        skip={!cart.lines.length}
                        alwaysRender
                      >
                        {({ data, loading, error }) => {

                          const locale = maybe(
                            () => geolocalization.country.code,
                            defaultCountry.code
                          );
                          if (loading) {
                            return (
                              <div className="cart">
                              <div className="overlay__header">
                                <ReactSVG
                                  path={cartImg}
                                  className="overlay__header__cart-icon"
                                />
                                <div className="overlay__header-text">
                                  My Cart,{" "}
                                  <span className="overlay__header-text-items">
                                    {extractCartLines(data, cart.lines, locale) && extractCartLines(data, cart.lines, locale).length !== 0 ? extractCartLines(data, cart.lines, locale).length : 0} items
                                  </span>
                                </div>
                                <ReactSVG
                                  path={closeImg}
                                  onClick={overlay.hide}
                                  className="overlay__header__close-icon"
                                />
                              </div>
                            
                            
                                  <ProductList
                                    lines={extractCartLines(data, cart.lines, locale)}
                                    remove={cart.remove}
                    
                                  />
                                  <div className="cart__footer">
                                    <div className="cart__footer__subtotoal">
                                      <span>Subtotal</span>

                                      <span>
                                        {getTotal(data, cart.lines, locale)}
                                      </span>
                                    </div>

                                    <div className="cart__footer__button">
                                      {userAvailable === false?
                                        <Button disabled>Go to my cart</Button>
                                        :
                                        <Link
                                          to={generatePath(cartUrl, {
                                            token: null,
                                          })}
                                        >
                                          <Button>Go to my cart</Button>
                                        </Link>
                                      }
                                    </div>
                                    <div className="cart__footer__button">
                                      {userAvailable === false?
                                        <Button disabled>Checkout</Button>
                                        :
                                        <Link
                                          to={user ? checkoutUrl : checkoutLoginUrl}
                                        >
                                          <Button>Checkout</Button>
                                        </Link>
                                      }
                                    </div>
                                  </div>
                          
                            </div>
                            );
                          }

                          if (error) {
                            return <Error error={error.message} />;
                          }

                          return (
                            <div className="cart">
                              <div className="overlay__header">
                                <ReactSVG
                                  path={cartImg}
                                  className="overlay__header__cart-icon"
                                />
                                <div className="overlay__header-text">
                                  My Cart,{" "}
                                  <span className="overlay__header-text-items">
                                    {extractCartLines(data, cart.lines, locale) && extractCartLines(data, cart.lines, locale).length !== 0 ? extractCartLines(data, cart.lines, locale).length : 0} items
                                  </span>
                                </div>
                                <ReactSVG
                                  path={closeImg}
                                  onClick={overlay.hide}
                                  className="overlay__header__close-icon"
                                />
                              </div>
                              {cart.lines.length && data ? (
                                <>
                                  <ProductList
                                    lines={extractCartLines(data, cart.lines, locale)}
                                    remove={cart.remove}
                                  
                                  />
                                  <div className="cart__footer">
                                    <div className="cart__footer__subtotoal">
                                      <span>Subtotal</span>

                                      <span>
                                        {getTotal(data, cart.lines, locale)}
                                      </span>
                                    </div>

                                    <div className="cart__footer__button">
                                      {userAvailable === false?
                                        <Button disabled>Go to my cart</Button>
                                        :
                                        <Link
                                          to={generatePath(cartUrl, {
                                            token: null,
                                          })}
                                        >
                                          <Button>Go to my cart</Button>
                                        </Link>
                                      }
                                    </div>
                                    <div className="cart__footer__button">
                                      {userAvailable === false?
                                        <Button disabled>Checkout</Button>
                                        :
                                        <Link
                                          to={user ? checkoutUrl : checkoutLoginUrl}
                                        >
                                          <Button>Checkout</Button>
                                        </Link>
                                      }
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <Empty overlayHide={overlay.hide} />
                              )}
                            </div>
                          );
                        }}
                      </TypedProductVariantsQuery>
                      )
                    }}
                </VerifyTokenAuthMutation>
              )}
            </ShopContext.Consumer>
          )}
        </CartContext.Consumer>
      </Online>
      <Offline>
        <div className="cart">
          <OfflinePlaceholder />
        </div>
      </Offline>
    </Overlay>
  );
};

export default Cart;
