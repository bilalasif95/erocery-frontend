import isEqual from "lodash/isEqual";
import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";

import { generateProductUrl } from "../../../core/utils";
import removeImg from "../../../images/garbage.svg";
import { LineI } from "../../CartTable/ProductRow";

const ProductList: React.SFC<{
  lines: LineI[];
  remove(variantId: string): void;
}> = ({ lines, remove }) => (
  <ul className="cart__list">
    {lines.map(line => {
      const productUrl = generateProductUrl(line.product.id, line.product.name);
      const price = line.pricing.price;
      const priceUndiscounted = line.pricing.priceUndiscounted;
      const getProductPrice = () => {
        if (isEqual(price, priceUndiscounted)) {
          return <TaxedMoney taxedMoney={price} />;
        } else {
          return (
            <>
              <span className="product-list-item__undiscounted_price">
                <TaxedMoney taxedMoney={priceUndiscounted} />
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TaxedMoney taxedMoney={price} />
            </>
          );
        }
      };
      return (
        <li key={line.id} className="cart__list__item">
          <Link to={productUrl}>
            <Thumbnail source={line.product} />
          </Link>
          <div className="cart__list__item__details">
            <p>
              {getProductPrice()}
              {/* <TaxedMoney taxedMoney={line.pricing.price} /> */}
            </p>
            <Link to={productUrl}>
              <p>{line.product.name}</p>
            </Link>
            <span className="cart__list__item__details__variant">
              <span>{line.name}</span>
              <span>{`Qty: ${line.quantity}`}</span>
            </span>
            <ReactSVG
              path={removeImg}
              className="cart__list__item__details__delete-icon"
              onClick={() => remove(line.id)}
            />
          </div>
        </li>
      );
    })}
  </ul>
);
export default ProductList;
