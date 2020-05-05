import * as React from "react";

import {
  useUserDetails
} from "@sdk/react";

import ProductList from "@components/organisms/ProductList/ProductList";

import { ProductDetails_product_category_products_edges } from "./types/ProductDetails";

import { CartContext } from "../../components/CartProvider/context";

const OtherProducts: React.FC<{
  products: ProductDetails_product_category_products_edges[];
}> = ({ products }) => {
  const {data: user} = useUserDetails();
  return (
  <div className="product-page__other-products">
    <div className="container">
      <h4 className="product-page__other-products__title">
        Other products in this category
      </h4>
      <CartContext.Consumer>
        {cart => (
          <ProductList 
            products={products.map(({ node }) => node)}
            addToCart={cart.add}
            onLoadMore={()=>null}
            canLoadMore={false}
            loading={false}
            user={user}
          />
        )}
      </CartContext.Consumer>
    </div>
  </div>
  )
};

export default OtherProducts;
