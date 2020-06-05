import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";

import { TextField } from "@components/molecules";
// import { ProductVariantPicker } from "@components/organisms";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/types/ProductDetails";
import { IProductVariantsAttributesSelectedValues, ITaxedMoney } from "@types";

import { TaxedMoney } from "../../@next/components/containers";
import { CartContext, CartLine } from "../CartProvider/context";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";

interface ProductDescriptionProps {
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  pricing: ProductDetails_product_pricing;
  addToCart(varinatId: string, quantity?: number): any;
  setVariantId(variantId: string);
}

interface ProductDescriptionState {
  error:any;
  quantity: number;
  variant: string;
  variantStock: number;
  variantPricing: ProductDetails_product_variants_pricing;
  variantPricingRange: {
    min: ITaxedMoney;
    max: ITaxedMoney;
  };
  price: any;
  priceUndiscounted: any;
}

class ProductDescription extends React.Component<
  ProductDescriptionProps,
  ProductDescriptionState
> {
  constructor(props: ProductDescriptionProps) {
    super(props);

    this.state = {
      error: undefined,
      price: props.pricing.priceRange.start,
      priceUndiscounted: props.pricing.priceRangeUndiscounted.start,
      quantity: 1,
      variant: "",
      variantPricing: null,
      variantPricingRange: {
        max: props.pricing.priceRange.stop,
        min: props.pricing.priceRange.start,
      },
      variantStock: null,
    };
  }

  getProductPrice = () => {
    if (isEqual(this.state.price, this.state.priceUndiscounted)) {
      return <TaxedMoney taxedMoney={this.state.price} />;
    } else {
      return (
        <>
          <span className="product-list-item__undiscounted_price">
            <TaxedMoney taxedMoney={this.state.priceUndiscounted} />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TaxedMoney taxedMoney={this.state.price} />
        </>
      );
    }
    // const { variantPricingRange, variantPricing } = this.state;
    // const { min, max } = variantPricingRange;
    // if (variantPricing) {
    //   if (isEqual(variantPricing.priceUndiscounted, variantPricing.price)) {
    //     return <TaxedMoney taxedMoney={variantPricing.price} />;
    //   } else {
    //     return (
    //       <>
    //         <span className="product-description__undiscounted_price">
    //           <TaxedMoney taxedMoney={variantPricing.priceUndiscounted} />
    //         </span>
    //         &nbsp;&nbsp;&nbsp;&nbsp;
    //         <TaxedMoney taxedMoney={variantPricing.price} />
    //       </>
    //     );
    //   }
    // }
    // if (isEqual(min, max)) {
    //   return <TaxedMoney taxedMoney={min} />;
    // } else {
    //   return (
    //     <>
    //       <TaxedMoney taxedMoney={min} /> - <TaxedMoney taxedMoney={max} />
    //     </>
    //   );
    // }
  };

  onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ) => {
    if (selectedVariant) {
      this.setState({
        variant: selectedVariant.id,
        variantPricing: selectedVariant.pricing,
        variantStock: selectedVariant.stockQuantity,
      });
      this.props.setVariantId(selectedVariant.id);
    } else {
      this.setState({ variant: "", variantPricing: null });
      this.props.setVariantId("");
    }
  };

  handleSubmit = () => {
    this.props.addToCart(this.props.productVariants[0].id, this.state.quantity).then((data)=>{
      this.setState({error:data})
    }).catch((error)=>{
       console.log("Error in component",error);
       this.setState({error})
    })
  };

  canAddToCart = (lines: CartLine[]) => {
    const { quantity } = this.state;
    // const cartLine = lines.find(({ variantId }) => variantId === variant);
    // const syncedQuantityWithCart = cartLine
    //   ? quantity + cartLine.quantity
    //   : quantity;
    return quantity !== 0 && (this.props.productVariants && this.props.productVariants[0].stockQuantity !==0);
  };
  
  render() {
    const { name } = this.props;
    const { quantity } = this.state;
    return (
      <div className="product-description">
        <h3>{name}</h3>
        <h4>{this.getProductPrice()}</h4>
        {this.props.productVariants.length === 0 || this.props.productVariants[0].attributes.length === 0 ? "" :
          <div className="product-description__variant-picker">
            <TextField
              label={this.props.productVariants && this.props.productVariants[0].attributes[0] && this.props.productVariants[0].attributes[0].attribute.name}
              value={this.props.productVariants && this.props.productVariants[0].attributes[0] && this.props.productVariants[0].attributes[0].values[0] && this.props.productVariants[0].attributes[0].values[0].value}
              readOnly
            />
            {/* <ProductVariantPicker
              productVariants={this.props.productVariants}
              onChange={this.onVariantPickerChange}
              // selectSidebar={true}
            /> */}
          </div>
        }
        <div className="product-description__quantity-input">
          <TextField
            name="quantity"
            errors={this.state.error}
            type="number"
            label="Quantity"
            min="1"
            value={quantity || ""}
            onChange={e =>
              this.setState({ quantity: Math.max(1, Number(e.target.value)) })
            }
          />
        </div>
        <CartContext.Consumer>
          {({ lines }) => (
            <AddToCart
              onSubmit={this.handleSubmit}
              lines={lines}
              disabled={!this.canAddToCart(lines) || this.props.productVariants.length === 0}
              
            />
          )}
        </CartContext.Consumer>
        <div className="product-description__add-to-wishlist">
          <AddToWishlist productId={this.props.productId} />
        </div>
      </div>
    );
  }
}

export default ProductDescription;
