import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { OrderByToken_orderByToken_lines_unitPrice } from "@sdk/queries/types/OrderByToken";

import { generateProductUrl } from "../../core/utils";
import { CartLine } from "../CartProvider/context";

import { ProductVariant } from "../../checkout/types/ProductVariant";
import cartAddDisabledImg from "../../images/cart-add-disabled.svg";
import cartAddImg from "../../images/cart-add.svg";
import cartRemoveImg from "../../images/cart-remove.svg";
import cartSubtractImg from "../../images/cart-subtract.svg";

export type LineI = ProductVariant & {
  quantity: number;
  totalPrice: OrderByToken_orderByToken_lines_unitPrice;
  stockQuantity?: number;
};

interface ReadProductRowProps {
  mediumScreen: boolean;
  line: any;
  deliveryDate: string;
}

export interface EditableProductRowProps {
  processing?: boolean;
  invalid?: boolean;
  add?(variantId: string): void;
  changeQuantity?(lines: CartLine[]): void;
  remove?(variantId: string): void;
  subtract?(variantId: string): void;
}

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({
  invalid,
  add,
  changeQuantity,
  deliveryDate,
  mediumScreen,
  processing,
  remove,
  subtract,
  line,
}) => {
  const productUrl = generateProductUrl(line.product.id, line.product.name);
  const editable = !!(add && subtract && remove && changeQuantity);
  const inStock =
    line.stockQuantity === undefined
      ? false
      : line.quantity < line.stockQuantity;
  const quantityChangeControls = (
    <div className="cart-table__quantity-cell__controls">
      <ReactSVG path={cartSubtractImg} onClick={() => subtract(line.id)} />
      <p>{line.quantity}</p>
      <ReactSVG
        className={classNames({ disabled: !inStock })}
        path={inStock ? cartAddImg : cartAddDisabledImg}
        onClick={inStock ? () => add(line.id) : undefined}
      />
    </div>
  );
  return (
    <tr
      className={classNames({
        "cart-table-row--processing": processing,
      })}
    >
      <td className="cart-table__thumbnail">
        <div>
          {mediumScreen && (
            <>
            {line.product.isPublished ?
            <Link to={productUrl}>
              <Thumbnail source={line.product} />
            </Link>
            : <Thumbnail source={line.product} />}
            </>
          )}
          {line.product.isPublished ? <Link to={productUrl}>{line.product.name}</Link>
          : <p>{line.product.name}</p>}
        </div>
      </td>

      {mediumScreen && (
        <td>
          <TaxedMoney taxedMoney={line.pricing.price} />
        </td>
      )}

      {line.product.category && line.product.category.name === "Qurbani" ? (
        <td>{deliveryDate && deliveryDate.slice(0, 10)}</td>
      ) : (
        <td>{line.name}</td>
      )}

      <td className="cart-table__quantity-cell">
        {editable ? quantityChangeControls : <p>{line.quantity}</p>}
      </td>

      <td colSpan={editable ? 1 : 2}>
        {/* {line.pricing.price.gross.currency} {line.pricing.price.gross.amount * line.quantity} */}
        <TaxedMoney
          taxedMoney={{
            gross: {
              amount: line.pricing.price.gross.amount * line.quantity,
              currency: line.pricing.price.gross.currency,
            },
            net: {
              amount: line.pricing.price.net.amount,
              currency: line.pricing.price.net.currency,
            },
          }}
        />
      </td>

      {editable && (
        <td>
          <ReactSVG path={cartRemoveImg} onClick={() => remove(line.id)} />
        </td>
      )}
    </tr>
  );
};

export default ProductRow;
