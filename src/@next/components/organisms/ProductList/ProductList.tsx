import React from "react";
import { Link } from "react-router-dom";

import { UserDetails_me } from "@sdk/queries/types/UserDetails";

import { Button, Loader } from "@components/atoms";
import { ProductTile } from "@components/molecules";

// import {
//   ProductDetails_product_variants_pricing,
// } from "@sdk/queries/types/ProductDetails";

import { generateProductUrl } from "../../../../core/utils";

import { CheckoutContext } from "../../../../checkout/context";
import { TypedCreateCheckoutMutation } from "../../../../checkout/queries";

import { CartContext,CartLine } from "../../../../components/CartProvider/context";

import { Category_products_edges_node } from "../../../../views/Category/types/Category";

import AddToCartButton from "../../../../components/ProductDescription/AddToCartButton";

import * as S from "./styles";
// import { IProps } from "./types";

interface ProductDescriptionProps {
  onLoadMore: () => void;
  products: Category_products_edges_node[];
  canLoadMore: boolean;
  loading: boolean;
  user: UserDetails_me | null;
  addToCart(varinatId: string, quantity?: number): void;
}

interface ProductDescriptionState {
  quantity: number;
  variant: string;
  // variantStock: number;
  // variantPricing: ProductDetails_product_variants_pricing;
  // variantPricingRange: {
  //   min: ITaxedMoney;
  //   max: ITaxedMoney;
};

class ProductList extends React.Component<ProductDescriptionProps,
ProductDescriptionState> {
  constructor(props: ProductDescriptionProps) {
    super(props);

    this.state = {
      quantity: 1,
      variant: "",
      // variantPricing: null,
      // variantPricingRange: {
      //   max: props.pricing.priceRange.stop,
      //   min: props.pricing.priceRange.start,
      // },
      // variantStock: null,
    };
  }
  handleSubmit = (id: string) => {
    this.setState({variant: id})
    this.props.addToCart(id , this.state.quantity);
  };
  canAddToCart = (lines: CartLine[],product: any) => {
    const { quantity } = this.state;
    return quantity !== 0 && product.variants[0].stockQuantity !==0;
  };
  render() {
  return (
    <>
      <S.List>
        {this.props.products.map(product => (
          <S.Item>
            <Link
              to={generateProductUrl(product.id, product.name)}
              key={product.id}
            >
              <ProductTile product={product} />
            </Link>
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
                      <S.CartButton>
                        <AddToCartButton
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
                          disabled={!this.canAddToCart(lines,product) || mutationLoading || checkoutLoading}
                        >
                          Add to Cart
                        </AddToCartButton>
                      </S.CartButton>
                    )}
                    </TypedCreateCheckoutMutation>
                  )}
                </CheckoutContext.Consumer>
              )}
            </CartContext.Consumer>
          </S.Item>
        ))}
      </S.List>
      <S.Loader>
        {this.props.loading ? (
          <Loader />
        ) : (
          this.props.canLoadMore && (
            <Button
              data-cy="load-more_button"
              // color="secondary"
              onClick={this.props.onLoadMore}
            >
              More +
            </Button>
          )
        )}
      </S.Loader>
    </>
  );
};
}
export default ProductList;