// import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { useRemoveWishlistProduct } from "@sdk/react";

// import { TaxedMoney } from "@components/containers";

import "./scss/index.scss";

import { Thumbnail } from "@components/molecules";

import { generateProductUrl } from "../../core/utils";

import { CartContext } from "../../components/CartProvider/context";

// import cartAddDisabledImg from "../../images/cart-add-disabled.svg";
// import cartAddImg from "../../images/cart-add.svg";
import cartRemoveImg from "../../images/cart-remove.svg";
// import cartSubtractImg from "../../images/cart-subtract.svg";

import { WishListQuery } from "@sdk/queries/wishlist";

const WishList: React.FC = () => {
  const [removeFromWishList] = useRemoveWishlistProduct();
  const removeFromWishListButtonClick = async (productId: string) => {
    const authenticated = await removeFromWishList({ productId });
    if (authenticated.data.errors.length === 0) {
      window.location.reload(false);
    }
  }
  return (
    <div className="address-book-container">
      <CartContext.Consumer>
        {cart => (
          <WishListQuery>
            {({ data }) => (
              <table className="cart-table">
                <tbody>
                    {data.me.wishlist.edges.map(({node}) => {
                      // const inStock =
                      // node.stockQuantity === undefined
                      //   ? false
                      //   : node.quantity < node.stockQuantity;
                      return (
                        <tr>
                          <td className="cart-table__thumbnail">
                            <div>
                              <Link to={generateProductUrl(node.product.id, node.product.name)}>
                                <Thumbnail source={node.product} />
                              </Link>
                              <Link to={generateProductUrl(node.product.id, node.product.name)}>{node.product.name}</Link>
                            </div>
                          </td>
                          <td>
                            {node.product.variants[0].pricing && node.product.variants[0].pricing.price.gross.currency}.{node.product.variants[0].pricing && node.product.variants[0].pricing.price.gross.amount}
                          </td>
                          {/* <td className="cart-table__quantity-cell">
                            {!!(cart.add && cart.subtract && cart.remove && cart.changeQuantity) ? 
                            <div className="cart-table__quantity-cell__controls">
                            <ReactSVG path={cartSubtractImg} onClick={() => cart.subtract(node.id)} />
                            <p>{node.quantity}</p>
                            <ReactSVG
                              className={classNames({ disabled: !inStock })}
                              path={inStock ? cartAddImg : cartAddDisabledImg}
                              onClick={inStock ? () => cart.add(node.id) : undefined}
                            />
                          </div> : <p>{node.quantity}</p>}
                          </td> */}
                          {/* {!!(cart.add && cart.subtract && cart.remove && cart.changeQuantity) && ( */}
                            <td>
                              <ReactSVG path={cartRemoveImg} onClick={()=>removeFromWishListButtonClick(node.product.id)} />
                            </td>
                          {/* )} */}
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            )}
          </WishListQuery>
        )}
      </CartContext.Consumer>
    </div>
  );
};

export default WishList;
