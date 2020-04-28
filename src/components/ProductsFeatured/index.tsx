import * as React from "react";
import { Link } from "react-router-dom";

// import {
//   ProductDetails_product_pricing,
//   ProductDetails_product_variants,
//   ProductDetails_product_variants_pricing,
// } from "@sdk/queries/types/ProductDetails";
// import { ITaxedMoney } from "@types";

import { ProductListItem } from "..";
import { generateProductUrl, maybe } from "../../core/utils";
import { TypedFeaturedProductsQuery } from "./queries";

// import { CartContext,CartLine } from "../CartProvider/context";

import "./scss/index.scss";

interface ProductsFeaturedProps {
  title?: string;
}
// interface ProductDescriptionProps {
  // productId: string;
  // productVariants: ProductDetails_product_variants[];
  // name: string;
  // pricing: ProductDetails_product_pricing;
  // addToCart(varinatId: string, quantity?: number): void;
//   setVariantId(variantId: string);
// }

// interface ProductDescriptionState {
//   quantity: number;
//   variant: string;
//   variantStock: number;
//   variantPricing: ProductDetails_product_variants_pricing;
  // variantPricingRange: {
  //   min: ITaxedMoney;
  //   max: ITaxedMoney;
  // };
// }
const ProductsFeatured : React.FC<ProductsFeaturedProps > = ({ title }) =>{
  // constructor(props: ProductDescriptionProps) {
  //   super(props);

  //   this.state = {
  //     quantity: 1,
  //     variant: "",
  //     variantPricing: null,
  //     // variantPricingRange: {
  //     //   max: props.pricing.priceRange.stop,
  //     //   min: props.pricing.priceRange.start,
  //     // },
  //     variantStock: null,
  //   };
  // }
  // handleSubmit = () => {
  //   this.props.addToCart(this.state.variant, this.state.quantity);
  // };
  // canAddToCart = (lines: CartLine[]) => {
  //   const { variant, quantity, variantStock } = this.state;
  //   const cartLine = lines.find(({ variantId }) => variantId === variant);
  //   const syncedQuantityWithCart = cartLine
  //     ? quantity + cartLine.quantity
  //     : quantity;
  //   return quantity !== 0 && variant && variantStock >= syncedQuantityWithCart;
  // };
  // render() {
  return (
    <TypedFeaturedProductsQuery displayError={false}>
      {({ data }) => {
        const products = maybe(
          () => data.shop.homepageCollection.products.edges,
          []
        );

        if (products.length) {
          return (
            <div className="products-featured">
              <div className="container featuredContainer">
          <h3>{title}</h3>
                {/* <Carousel>
                  {products.map(({ node: product }) => (
                    <Link
                      to={generateProductUrl(product.id, product.name)}
                      key={product.id}
                    >
                      <ProductListItem product={product} />
                    </Link>
                  ))}
                </Carousel> */}
                <div className="products-list">
                {/* <CartContext.Consumer>
                {({ lines }) => (
                  <> */}
                {products.slice(0,8).map(({ node: product }) => (
                    <Link
                      to={generateProductUrl(product.id, product.name)}
                      key={product.id}
                      className="mb"
                    >
                      <ProductListItem 
                        product={product} 
                        // onSubmit={this.handleSubmit}
                        // lines={lines}
                        // disabled={!this.canAddToCart(lines)} 
                        />
                    </Link>
                  ))}
                  {/* </>
                )}
                </CartContext.Consumer> */}
                </div>
              </div>
            </div>
          );
        } else {
          return null;
        }
      }}
    </TypedFeaturedProductsQuery>
  );
};


ProductsFeatured.defaultProps = {
  title: "Featured",
};

export default ProductsFeatured;
