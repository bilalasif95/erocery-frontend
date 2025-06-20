import React, { useContext } from "react";
import {
  mediumScreen,
  // smallScreen,
} from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

import { useSignOut, useUserDetails } from "@sdk/react";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "..";
import * as appPaths from "../../app/routes";
import { CheckoutContext } from "../../checkout/context";
import { maybe } from "../../core/utils";
import { CartContext } from "../CartProvider/context";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery } from "./queries";

import cartImg from "../../images/Cart-icon.svg";
// import categorydropdown from "../../images/categorydropdown.svg"
import logoImg from "../../images/erocery_logo.svg";
import hamburgerHoverImg from "../../images/hamburger-hover.svg";
import hamburgerImg from "../../images/hamburger.svg";
import searchImg from "../../images/search.svg";
import userImg from "../../images/user.svg";

import { history } from "../../history";

import { ShopContext } from "../ShopProvider/context";

import { TypedProductVariantsQuery } from "../../views/Product/queries";

import { useAlert } from "react-alert";

import { extractCartLines } from "../CartProvider/utils";

const MainMenu: React.FC = () => {
  const alert = useAlert();
  const { data: user } = useUserDetails();
  const [signOut] = useSignOut();
  const { clear: clearCart } = useContext(CartContext);
  const { clear: clearCheckout } = useContext(CheckoutContext);

  const handleSignOut = () => {
    signOut()
      .then(data => {
        clearCheckout();
        clearCart();
        window.location.replace("/");
        // window.history.pushState(null, null, "/")
      })
      .catch(error => {
        alert.show(
          {
            title: "Error in log out. Please try again.",
          },
          { type: "error", timeout: 5000 }
        );
      });
  };

  const scrollToCategory = () => {
    history.push("/");
    setTimeout(() => {
      document.getElementById("categorysection").scrollIntoView();
    }, 200);
  };

  return (
    <OverlayContext.Consumer>
      {overlayContext => (
        <nav className="main-menu" id="header">
          <div className="menubar">
            <div className="main-menu__left">
              <TypedMainMenuQuery renderOnError displayLoader={false}>
                {({ data }) => {
                  const items = maybe(
                    () => data.shop.navigation.main.items,
                    []
                  );

                  return (
                    <ul>
                      <Media
                        query={{ maxWidth: mediumScreen }}
                        render={() => (
                          <li
                            className="main-menu__hamburger"
                            onClick={() =>
                              overlayContext.show(
                                OverlayType.sideNav,
                                OverlayTheme.left,
                                { data: items }
                              )
                            }
                          >
                            <ReactSVG
                              path={hamburgerImg}
                              className={"main-menu__hamburger--icon"}
                            />
                            <ReactSVG
                              path={hamburgerHoverImg}
                              className={"main-menu__hamburger--hover"}
                            />
                          </li>
                        )}
                      />
                      {/* <Media
                        query={{ minWidth: mediumScreen }}
                        render={() =>
                          <MenuDropdown
                            head={
                              <li className="main-menu__cats">
                                <ReactSVG path={hamburgerImg}  />
                                <p className="cats">Categories</p>
                              </li>
                            }
                            content={
                              <ul className="main-menu__dropdown">
                                {items.map(item => (
                                  <li
                                    key={item.id}
                                  >
                                    <Link to={`/category/${item.name}/${item.category.number}`}>
                                      {item.name}
                                    </Link>

                                  </li>
                                ))}
                              </ul>
                            }
                          />
                        }
                      /> */}
                      <li
                        className="main-menu__item"
                        onClick={() => scrollToCategory()}
                      >
                        <span className="allcat">All Categories</span>
                      </li>
                      <Media
                        query={{ minWidth: mediumScreen }}
                        render={() =>
                          items.map(item =>
                            item.name === "Qurbani" ? (
                              <li
                                data-cy="main-menu__item"
                                className="main-menu__item"
                                key={item.id}
                              >
                                <NavDropdown
                                  overlay={overlayContext}
                                  {...item}
                                />
                                <small
                                  style={{
                                    background: "#ea4235",
                                    borderRadius: "30px",
                                    color: "#fff",
                                    content: "attr(badge)",
                                    fontSize: "11px",
                                    minWidth: "20px",
                                    padding: "1px 3px",
                                    position: "absolute",
                                    right: "0",
                                    textAlign: "center",
                                    textTransform: "capitalize",
                                    top: "5px",
                                  }}
                                >
                                  New
                                </small>
                              </li>
                            ) : (
                              <li
                                data-cy="main-menu__item"
                                className="main-menu__item"
                                key={item.id}
                              >
                                <NavDropdown
                                  overlay={overlayContext}
                                  {...item}
                                />
                              </li>
                            )
                          )
                        }
                      />
                    </ul>
                  );
                }}
              </TypedMainMenuQuery>
            </div>

            <div className="main-menu__center">
              <Link to={appPaths.homeUrl}>
                <ReactSVG path={logoImg} className="logoImg" />
              </Link>
            </div>

            <div className="main-menu__right">
              <ul>
                <Online>
                  {/* <Media
                  query={{ minWidth: smallScreen }}
                  render={() => ( */}
                  <>
                    {user ? (
                      <MenuDropdown
                        head={
                          <li className="main-menu__icon main-menu__user--active accountcss">
                            <ReactSVG path={userImg} />
                            <p className="accountpara">Account</p>
                          </li>
                        }
                        content={
                          <ul className="main-menu__dropdown">
                            <li data-testid="my_account__link">
                              <Link to={appPaths.accountUrl}>My Account</Link>
                            </li>
                            <li data-testid="order_history__link">
                              <Link to={appPaths.orderHistoryUrl}>
                                Order history
                              </Link>
                            </li>
                            <li data-testid="order_history__link">
                              <Link to={appPaths.wishlistUrl}>Wishlist</Link>
                            </li>
                            <li data-testid="address_book__link">
                              <Link to={appPaths.addressBookUrl}>
                                Address book
                              </Link>
                            </li>
                            {/* <li data-testid="payment_options__link">
                                <Link to={appPaths.paymentOptionsUrl}>
                                  Payment options
                                </Link>
                              </li> */}
                            <li
                              onClick={handleSignOut}
                              data-testid="logout-link"
                            >
                              Log Out
                            </li>
                          </ul>
                        }
                      />
                    ) : (
                      <li
                        data-testid="login-btn"
                        className="main-menu__icon"
                        onClick={() =>
                          overlayContext.show(
                            OverlayType.login,
                            OverlayTheme.right
                          )
                        }
                      >
                        <ReactSVG path={userImg} />
                      </li>
                    )}
                  </>
                  {/* )}
                /> */}
                  <CartContext.Consumer>
                    {cart => (
                      <ShopContext.Consumer>
                        {({ defaultCountry, geolocalization }) => (
                          <TypedProductVariantsQuery
                            displayLoader={false}
                            variables={{
                              ids: cart.lines.map(line => line.variantId),
                            }}
                            skip={!cart.lines.length}
                            alwaysRender
                          >
                            {({ data, loading, error }) => {
                              const locale = maybe(
                                () => geolocalization.country.code,
                                defaultCountry.code
                              );
                              return (
                                <li
                                  className="main-menu__icon main-menu__cart"
                                  onClick={() => {
                                    overlayContext.show(
                                      OverlayType.cart,
                                      OverlayTheme.right
                                    );
                                  }}
                                >
                                  <ReactSVG path={cartImg} />
                                  {extractCartLines(data, cart.lines, locale) &&
                                  extractCartLines(data, cart.lines, locale)
                                    .length > 0 ? (
                                    <span className="main-menu__cart__quantity">
                                      {
                                        extractCartLines(
                                          data,
                                          cart.lines,
                                          locale
                                        ).length
                                      }
                                    </span>
                                  ) : null}
                                </li>
                              );
                            }}
                          </TypedProductVariantsQuery>
                        )}
                      </ShopContext.Consumer>
                    )}
                  </CartContext.Consumer>
                </Online>
                <Offline>
                  <li className="main-menu__offline">
                    <Media
                      query={{ minWidth: mediumScreen }}
                      render={() => <span>Offline</span>}
                    />
                  </li>
                </Offline>
                <li
                  className="main-menu__search deskview"
                  onClick={() =>
                    overlayContext.show(OverlayType.search, OverlayTheme.right)
                  }
                >
                  <Media
                    query={{ minWidth: mediumScreen }}
                    render={() => <span>Search</span>}
                  />
                  <ReactSVG path={searchImg} />
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="res-search">
            <ul>
              <li
                className="main-menu__search"
                onClick={() =>
                  overlayContext.show(OverlayType.search, OverlayTheme.right)
                }
              >
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => <span>Search</span>}
                />
                <ReactSVG path={searchImg} />
              </li>
            </ul>
          </div> */}
        </nav>
      )}
    </OverlayContext.Consumer>
  );
};

export default MainMenu;
