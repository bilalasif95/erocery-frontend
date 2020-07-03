import "./scss/index.scss";

import { history } from "../../history";

import isEqual from "lodash/isEqual";
import * as React from "react";
// import { withRouter } from "react-router";
// import { Link } from "react-router-dom";

import { Button } from "@temp/@next/components/atoms";

import { TextField } from "@components/molecules";

import { OverlayContext, OverlayTheme, OverlayType } from "..";

// import { ProductVariantPicker } from "@components/organisms";

import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/types/ProductDetails";
import { IProductVariantsAttributesSelectedValues, ITaxedMoney } from "@types";

import { baseUrl as bakracheckoutUrl } from "../../bakracheckout/routes";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TaxedMoney } from "../../@next/components/containers";
import { CartContext, CartLine } from "../CartProvider/context";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";

import { TypedCreateBakraCheckoutMutation } from "../../bakracheckout/queries";

import { BakraCheckoutContext } from "../../bakracheckout/context";

interface ProductDescriptionProps {
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  category: string;
  pricing: ProductDetails_product_pricing;
  addToCart(varinatId: string, quantity?: number): any;
  setVariantId(variantId: string);
}

interface ProductDescriptionState {
  error: any;
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
  date: any;
}

class ProductDescription extends React.Component<
  ProductDescriptionProps,
  ProductDescriptionState
> {
  constructor(props: ProductDescriptionProps) {
    super(props);

    this.state = {
      date: null,
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

  addDays = (minDate, maxDate) => {
    return minDate + maxDate;
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
    this.props
      .addToCart(this.props.productVariants[0].id, this.state.quantity)
      .then(data => {
        this.setState({ error: data });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  canAddToCart = (lines: CartLine[]) => {
    const { quantity } = this.state;
    // const cartLine = lines.find(({ variantId }) => variantId === variant);
    // const syncedQuantityWithCart = cartLine
    //   ? quantity + cartLine.quantity
    //   : quantity;
    return (
      quantity !== 0 &&
      this.props.productVariants &&
      this.props.productVariants[0].stockQuantity !== 0
    );
  };

  render() {
    const { name } = this.props;
    const { quantity } = this.state;

    const ExampleCustomInput = ({ value, onClick }) => (
      <button className="datepick" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="#bdbdbd"
            d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"
          />
        </svg>
        {value === "" ? (
          <span className="selectdate">Select Delivery Date</span>
        ) : (
          <span className="selectedate">{value}</span>
        )}
      </button>
    );

    return (
      <OverlayContext.Consumer>
        {overlayContext => (
          <div className="product-description">
            <h3>{name}</h3>
            <h4>{this.getProductPrice()}</h4>
            {this.props.category === "VIP Qurbani" && (
              <h4>
                Book it now in just {this.state.price.gross.currency}{" "}
                {this.state.price.gross.amount * 0.25} only
              </h4>
            )}
            {this.props.productVariants.length === 0 ||
            this.props.productVariants[0].attributes.length === 0 ? (
              ""
            ) : (
              <div className="product-description__variant-picker">
                <TextField
                  label={
                    this.props.productVariants &&
                    this.props.productVariants[0].attributes[0] &&
                    this.props.productVariants[0].attributes[0].attribute.name
                  }
                  value={
                    this.props.productVariants &&
                    this.props.productVariants[0].attributes[0] &&
                    this.props.productVariants[0].attributes[0].values[0] &&
                    this.props.productVariants[0].attributes[0].values[0].value
                  }
                  readOnly
                />
                {/* <ProductVariantPicker
              productVariants={this.props.productVariants}
              onChange={this.onVariantPickerChange}
              // selectSidebar={true}
            /> */}
              </div>
            )}
            {this.props.category === "VIP Qurbani" ? (
              <div className="product-description__quantity-input">
                <TextField
                  name="quantity"
                  errors={this.state.error}
                  type="number"
                  disabled
                  label="Quantity"
                  min="1"
                  value={quantity || ""}
                  onChange={e =>
                    this.setState({
                      quantity: Math.max(1, Number(e.target.value)),
                    })
                  }
                />
              </div>
            ) : (
              <div className="product-description__quantity-input">
                <TextField
                  name="quantity"
                  errors={this.state.error}
                  type="number"
                  label="Quantity"
                  min="1"
                  value={quantity || ""}
                  onChange={e =>
                    this.setState({
                      quantity: Math.max(1, Number(e.target.value)),
                    })
                  }
                />
              </div>
            )}
            {this.props.category === "VIP Qurbani" ? (
              <BakraCheckoutContext.Consumer>
                {({ update }) => (
                  <TypedCreateBakraCheckoutMutation
                    onCompleted={async ({
                      CheckoutVipCreate: { checkout, errors },
                    }) => {
                      if (!errors.length) {
                        await update({ checkout });
                        const tempObj = [
                          {
                            quantity: checkout.lines[0].quantity,
                            variantId: checkout.lines[0].variant.id,
                          },
                        ];
                        localStorage.setItem(
                          "bakraLines",
                          JSON.stringify(tempObj)
                        );
                        localStorage.setItem("checkoutID", checkout.id);
                        localStorage.setItem(
                          "bakraCheckoutToken",
                          JSON.stringify(checkout.token)
                        );
                      }
                      //  onSubmit();
                    }}
                  >
                    {(CheckoutVipCreate, { loading: mutationLoading }) => (
                      <div className="bookBtn">
                        <div className="datepick">
                          <DatePicker
                            selected={this.state.date}
                            onChange={date => this.setState({ date })}
                            customInput={
                              <ExampleCustomInput
                                value={"Select Delivery Date"}
                                onClick={date => this.setState({ date })}
                              />
                            }
                            // className="datepicker"
                            minDate={new Date("23 July 2020")}
                            maxDate={new Date("30 July 2020")}
                            placeholderText="Select Delivery Date"
                            dateFormat="MMMM d, yyyy"
                          />
                          {/* <DatePicker
                            selected={this.state.date}
                            onChange={date => this.setState({ date })}
                            className="datepicker"
                            minDate={new Date("23 July 2020")}
                            maxDate={new Date("30 July 2020")}
                            placeholderText="Select Delivery Date"
                            dateFormat="MMMM d, yyyy"
                          /> */}
                        </div>

                        {/* <Link
                          to={
                            window.localStorage.getItem("token")
                              ? bakracheckoutUrl
                              : "/login"
                          }
                          className="btnLink"
                        > */}
                        <Button
                          style={{ width: "100%" }}
                          disabled={
                            this.state.date === null ||
                            (this.props.productVariants &&
                              this.props.productVariants[0].stockQuantity === 0)
                          }
                          onClick={
                            window.localStorage.getItem("token") === null
                              ? () => {
                                  overlayContext.show(
                                    OverlayType.login,
                                    OverlayTheme.right
                                  );
                                }
                              : () => {
                                  CheckoutVipCreate({
                                    variables: {
                                      checkoutInput: {
                                        lines: [
                                          {
                                            quantity: this.state.quantity,
                                            variantId: this.props
                                              .productVariants[0].id,
                                          },
                                        ],
                                        shippingDate: this.state.date,
                                      },
                                    },
                                  })
                                    .then(response => {
                                      history.push(bakracheckoutUrl);
                                    })
                                    .catch(error => {
                                      console.log("");
                                    });
                                }
                          }
                        >
                          {this.props.productVariants &&
                          this.props.productVariants[0].stockQuantity === 0
                            ? "Out of Stock"
                            : "Book Now"}
                        </Button>
                        {/* </Link> */}
                      </div>
                    )}
                  </TypedCreateBakraCheckoutMutation>
                )}
              </BakraCheckoutContext.Consumer>
            ) : (
              <CartContext.Consumer>
                {({ lines }) => (
                  <AddToCart
                    onSubmit={this.handleSubmit}
                    lines={lines}
                    disabled={
                      !this.canAddToCart(lines) ||
                      this.props.productVariants.length === 0
                    }
                    error={this.state.error}
                    typeCart={true}
                  />
                )}
              </CartContext.Consumer>
            )}
            <div className="product-description__add-to-wishlist">
              <AddToWishlist productId={this.props.productId} />
            </div>
          </div>
        )}
      </OverlayContext.Consumer>
    );
  }
}

export default ProductDescription;
