import * as React from "react";
import { Link } from "react-router-dom";

import { Money, TaxedMoney } from "@components/containers";

import { AddressSummary, CartTable, NotFound } from "../../../components";
import { LineI } from "../../../components/CartTable/ProductRow";
import { OrderById_order, OrderById_order_lines } from "./types/OrderById";
import {
  OrderByToken_orderByToken,
  OrderByToken_orderByToken_lines,
} from "./types/OrderByToken";

import { orderHistoryUrl } from "../../../app/routes";

const extractOrderLines = (
  lines: Array<OrderById_order_lines | OrderByToken_orderByToken_lines>
): LineI[] => {
  return lines
    .map(line => ({
      quantity: line.quantity,
      totalPrice: {
        ...line.unitPrice,
        currency: line.unitPrice.currency,
        gross: {
          amount: line.quantity * line.unitPrice.gross.amount,
          ...line.unitPrice.gross,
        },
        net: {
          amount: line.quantity * line.unitPrice.net.amount,
          ...line.unitPrice.net,
        },
      },
      ...line.variant,
      name: line.productName,
    }))
    .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
};

const Page: React.FC<{
  guest: boolean;
  order: OrderById_order | OrderByToken_orderByToken;
}> = ({ guest, order }) =>
  order ? (
    <>
      {!guest && (
        <Link className="order-details__link" to={orderHistoryUrl}>
          Go back to Order History
        </Link>
      )}
      <h3>Your order no: {order.number}</h3>
      <p className="order-details__status">
        {order.paymentStatusDisplay} / {order.statusDisplay}
      </p>
      <CartTable
        lines={extractOrderLines(order.lines)}
        totalCost={<TaxedMoney taxedMoney={order.total} />}
        deliveryCost={<TaxedMoney taxedMoney={order.shippingPrice} />}
        subtotal={<TaxedMoney taxedMoney={order.subtotal} />}
        discountName={{ deliveryDate: order.deliveryDate }}
        payCost={
          <Money
            defaultValue="0"
            money={{
              amount: order.subtotal.gross.amount * 0.25,
              currency: order.subtotal.gross.currency,
            }}
          />
        }
        balanceCost={
          <Money
            defaultValue="0"
            money={{
              amount:
                order.subtotal.gross.amount -
                order.subtotal.gross.amount * 0.25,
              currency: order.subtotal.gross.currency,
            }}
          />
        }
      />
      <div className="order-details__summary">
        <div>
          <h4>Shipping Address</h4>
          <AddressSummary
            address={order.shippingAddress}
            email={order.userEmail}
            paragraphRef={this.shippingAddressRef}
          />
        </div>
      </div>
    </>
  ) : (
    <NotFound />
  );

export default Page;
