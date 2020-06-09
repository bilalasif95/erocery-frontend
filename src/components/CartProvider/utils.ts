import { Checkout_lines } from "../../checkout/types/Checkout";
import { priceToString } from "../../core/utils";
import { VariantList } from "../../views/Product/types/VariantList";
import { LineI } from "../CartTable/ProductRow";
import { CartLineInterface } from "./context";

export const getTotal = (
  variantList: VariantList,
  lines: CartLineInterface[],
  locale?: string
): string => {
  lines = lines.filter(line=> variantList && variantList.productVariants && variantList.productVariants.edges.find(({ node: { id } }) => id === line.variantId));
  localStorage.setItem("cart",JSON.stringify(lines));
  const amount = lines.reduce((sum, { variantId, quantity }) => {
    const { node } = variantList && variantList.productVariants && variantList.productVariants.edges.find(
      ({ node: { id } }) => id === variantId
    );
    return sum + node.pricing.price.gross.amount * quantity;
  }, 0);
  const {
    currency,
  } = variantList && variantList.productVariants && variantList.productVariants.edges.length === 0 ? {currency: ""} : variantList && variantList.productVariants && variantList.productVariants.edges[0] && variantList.productVariants.edges[0].node.pricing.price.gross;

  return currency === "" ? "" : priceToString({ amount, currency }, locale);
};

export const extractCartLines = (
  data: VariantList,
  lines: CartLineInterface[],
  locale?: string
): LineI[] =>
  data && data.productVariants && data.productVariants.edges
    .map(({ node }) => {
      const line = lines.find(({ variantId }) => variantId === node.id);
      if (!line) {
        return;
      }
      const quantity = line.quantity;
      return {
        ...node,
        quantity,
        totalPrice: {
          ...node.pricing.price,
          currency: node.pricing.price.gross.currency,
          gross: {
            amount: quantity * node.pricing.price.gross.amount,
            ...node.pricing.price.gross,
          },
          locale,
          net: {
            amount: quantity * node.pricing.price.net.amount,
            ...node.pricing.price.net,
          },
        },
      };
    })
    .filter(line => line)
    .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));

export const extractCheckoutLines = (lines: Checkout_lines[]): LineI[] => {
  return lines
    .map(line => ({
      quantity: line.quantity,
      totalPrice: {
        ...line.totalPrice,
        currency: line.totalPrice.gross.currency,
        gross: {
          amount: line.quantity * line.totalPrice.gross.amount,
          ...line.totalPrice.gross,
        },
        net: {
          amount: line.quantity * line.totalPrice.net.amount,
          ...line.totalPrice.net,
        },
      },
      ...line.variant,
    }))
    .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
};
