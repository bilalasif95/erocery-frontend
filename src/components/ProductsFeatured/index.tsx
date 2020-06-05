import * as React from "react";
import { Link } from "react-router-dom";

import { UserDetails_me } from "@sdk/queries/types/UserDetails";

// import { ProductVariantPicker } from "@components/organisms";

import {
  // ProductDetails_product_pricing,
  // ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/types/ProductDetails";
// import { IProductVariantsAttributesSelectedValues } from "@types";

import { ProductListItem } from "..";
import { generateProductUrl, maybe } from "../../core/utils";
import { TypedFeaturedProductsQuery } from "./queries";

import { CheckoutContext } from "../../checkout/context";
import { TypedCreateCheckoutMutation } from "../../checkout/queries";

import { CartContext,CartLine } from "../CartProvider/context";

import AddToCartButton from "../ProductDescription/AddToCartButton";

import "./scss/index.scss";

// interface ProductsFeaturedProps {
//   title?: string;
// }
interface ProductDescriptionProps {
  // productId: string;
  // productVariants: ProductDetails_product_variants[];
  user: UserDetails_me;
  // name: string;
  // pricing: ProductDetails_product_pricing;
  addToCart(varinatId: string, quantity?: number): void;
  // setVariantId(variantId: string);
}

interface ProductDescriptionState {
  quantity: number;
  variant: string;
  variantStock: number;
  variantPricing: ProductDetails_product_variants_pricing;
  // variantPricingRange: {
  //   min: ITaxedMoney;
  //   max: ITaxedMoney;
};

class ProductsFeatured extends React.Component<ProductDescriptionProps,
ProductDescriptionState> {
  constructor(props: ProductDescriptionProps) {
    super(props);

    this.state = {
      quantity: 1,
      variant: "",
      variantPricing: null,
      // variantPricingRange: {
      //   max: props.pricing.priceRange.stop,
      //   min: props.pricing.priceRange.start,
      // },
      variantStock: null,
    };
  }
  // onVariantPickerChange = (
  //   _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
  //   selectedVariant?: ProductDetails_product_variants
  // ) => {
  //   if (selectedVariant) {
  //     this.setState({
  //       variant: selectedVariant.id,
  //       variantPricing: selectedVariant.pricing,
  //       variantStock: selectedVariant.stockQuantity,
  //     });
  //     this.props.setVariantId(selectedVariant.id);
  //   } else {
  //     this.setState({ variant: "", variantPricing: null });
  //     this.props.setVariantId("");
  //   }
  // };
  handleSubmit = (id: string) => {
    this.setState({variant: id})
    this.props.addToCart(id , this.state.quantity);
  };
  canAddToCart = (lines: CartLine[],product) => {
    const { quantity } = this.state;
    // Object.values(product)[0] === variant;
    // console.log(Object.values(product)[0],"======")
    // Object.values(product).forEach((variantId) => {
    //   console.log(variantId,"=======")
    //   variantId[0] === variant
    // });
    // const cartLine = lines.find(({ variantId }) => variantId === variant);
    
    // const syncedQuantityWithCart = cartLine
    //   ? quantity + cartLine.quantity
    //   : quantity;
    return quantity !== 0 && product.variants[0].stockQuantity !==0;
  };
  render() {
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
              <h3>FEATURED</h3>
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
                {products.slice(0,8).map(({ node: product }) => (
                  <div className="proItem">
                      <Link
                        to={generateProductUrl(product.id, product.name)}
                        key={product.id}
                        className="mb"
                      >
                          <ProductListItem product={product}/>
                      </Link>
                      {/* <ProductVariantPicker
                        productVariants={this.props.productVariants}
                        onChange={this.onVariantPickerChange}
                        selectSidebar={true}
                      /> */}
                      <CartContext.Consumer>
                        {({ lines }) => (
                      <CheckoutContext.Consumer>
                      {({ checkout, update, loading: checkoutLoading }) => (
                        <TypedCreateCheckoutMutation
                          onCompleted={async ({ checkoutCreate: { checkout, errors } }) => {
                            if (!errors.length) {
                              await update({ checkout });
                            }
                            this.handleSubmit(product.variants[0].id);
                          }}
                        >
                          {(createCheckout, { loading: mutationLoading }) => (
                            <AddToCartButton className="buyBtn"
                              onClick={() => {
                                this.setState({variant: product.id})
                                if (this.props.user && !checkout) {
                                  createCheckout({
                                    variables: {
                                      checkoutInput: { phone: this.props.user.phone, lines },
                                    },
                                  });
                                } else {
                                  this.handleSubmit(product.variants[0].id);
                                }
                              }}
                              disabled={!this.canAddToCart(lines,product) || mutationLoading}
                            >
                              Add to Cart
                            </AddToCartButton>
                            )}
                          </TypedCreateCheckoutMutation>
                          )}
                          </CheckoutContext.Consumer>
                          )}
                          </CartContext.Consumer>
                          </div>
                  ))}
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
}
// ProductsFeatured.defaultProps = {
//   title: "Featured",
// };

export default ProductsFeatured;
