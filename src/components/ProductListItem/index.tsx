import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";

import { Thumbnail } from "@components/molecules";

import { TaxedMoney } from "../../@next/components/containers";
import { BasicProductFields } from "../../views/Product/types/BasicProductFields";

export interface Product extends BasicProductFields {
  category?: {
    id: string;
    name: string;
  };
  pricing: {
    onSale: boolean;
    priceRange: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
    };
    priceRangeUndiscounted: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
    };
  };
}

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { category } = product;
  const price = product.pricing.priceRange.start;
  const priceUndiscounted = product.pricing.priceRangeUndiscounted.start;
  const getProductPrice = () => {
    if (isEqual(price, priceUndiscounted)) {
      return <TaxedMoney taxedMoney={price} />;
    } else {
      return (
        <>
          <span className="product-list-item__undiscounted_price">
            <TaxedMoney taxedMoney={priceUndiscounted} />
          </span>
          <TaxedMoney taxedMoney={price} />
        </>
      );
    }
  };
  return (
    <div className="product-list-item">
      {product.pricing && product.pricing.onSale && <span className="saleDiscount">{(100-((price.gross.amount/priceUndiscounted.gross.amount)*100)).toFixed(0)}% OFF</span>}
      <div className="product-list-item__image">
        <Thumbnail source={product} />
      </div>
      <h4 className="product-list-item__title">{product.name}</h4>
      <p className="product-list-item__category">{category.name}</p>
      <div className="footerDiv">
        <p className="product-list-item__price">
          {getProductPrice()}</p>
      </div>
    </div>
  );
};

export default ProductListItem;
