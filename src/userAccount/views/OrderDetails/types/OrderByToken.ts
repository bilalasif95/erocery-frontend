/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  PaymentChargeStatusEnum,
  OrderStatus,
} from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: OrderByToken
// ====================================================

export interface OrderByToken_orderByToken_shippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface OrderByToken_orderByToken_shippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: OrderByToken_orderByToken_shippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_net;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderByToken_orderByToken_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderByToken_orderByToken_lines_variant_pricing_price_net;
}

export interface OrderByToken_orderByToken_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: OrderByToken_orderByToken_lines_variant_pricing_price | null;
}

export interface OrderByToken_orderByToken_lines_variant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface OrderByToken_orderByToken_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderByToken_orderByToken_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: OrderByToken_orderByToken_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: OrderByToken_orderByToken_lines_variant_product_thumbnail2x | null;
}

export interface OrderByToken_orderByToken_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: OrderByToken_orderByToken_lines_variant_pricing | null;
  product: OrderByToken_orderByToken_lines_variant_product;
}

export interface OrderByToken_orderByToken_lines_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_lines_unitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderByToken_orderByToken_lines_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderByToken_orderByToken_lines_unitPrice_net;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_lines {
  __typename: "OrderLine";
  productName: string;
  quantity: number;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: OrderByToken_orderByToken_lines_variant | null;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: OrderByToken_orderByToken_lines_unitPrice | null;
}

export interface OrderByToken_orderByToken_subtotal_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_subtotal_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_subtotal {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderByToken_orderByToken_subtotal_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderByToken_orderByToken_subtotal_net;
}

export interface OrderByToken_orderByToken_total_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_total_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderByToken_orderByToken_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderByToken_orderByToken_total_net;
}

export interface OrderByToken_orderByToken_shippingPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_shippingPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderByToken_orderByToken_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderByToken_orderByToken_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderByToken_orderByToken_shippingPrice_net;
}

export interface OrderByToken_orderByToken {
  __typename: "Order";
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
  deliveryDate: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum | null;
  /**
   * User-friendly payment status.
   */
  paymentStatusDisplay: string | null;
  status: OrderStatus;
  /**
   * User-friendly order status.
   */
  statusDisplay: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  shippingAddress: OrderByToken_orderByToken_shippingAddress | null;
  /**
   * List of order lines.
   */
  lines: (OrderByToken_orderByToken_lines | null)[];
  /**
   * The sum of line prices not including shipping.
   */
  subtotal: OrderByToken_orderByToken_subtotal | null;
  /**
   * Total amount of the order.
   */
  total: OrderByToken_orderByToken_total | null;
  /**
   * Total price of shipping.
   */
  shippingPrice: OrderByToken_orderByToken_shippingPrice | null;
}

export interface OrderByToken {
  /**
   * Look up an order by token.
   */
  orderByToken: OrderByToken_orderByToken | null;
}

export interface OrderByTokenVariables {
  token: any;
}
