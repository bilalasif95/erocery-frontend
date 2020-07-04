import React from "react";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";

import isEqual from "lodash/isEqual";

import * as S from "./styles";
import { IProps } from "./types";

// import AddToCartButton from "../ProductDescription/AddToCartButton";

// import arrowLink from "../../images/catArrow.png";

export const ProductTile: React.FC<IProps> = ({ product }: IProps) => {
  const price =
    product.pricing &&
    product.pricing.priceRange &&
    product.pricing.priceRange.start
      ? product.pricing.priceRange.start
      : undefined;

  const priceUndiscounted =
    product.pricing &&
    product.pricing.priceRangeUndiscounted &&
    product.pricing.priceRangeUndiscounted.start
      ? product.pricing.priceRangeUndiscounted.start
      : undefined;

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
    <S.Wrapper data-cy="product-tile">
      <S.DeskView>
        <S.Image>
          <Thumbnail source={product} />
        </S.Image>
        <S.Title>{product.name}</S.Title>
        <S.Price>
          {getProductPrice()}
          {/* <TaxedMoney taxedMoney={price} /> */}
          {product && product.category && product.category.name === "Qurbani" && (
            <span className="advancebook">
              Booking: {price && price.gross.currency}
              {price && price.gross.amount * 0.25}
            </span>
          )}
        </S.Price>
      </S.DeskView>
      {/* <S.MobView>
        <S.Image>
          <Thumbnail source={product} />
        </S.Image>
        <S.Details>
          <S.Content>
          <S.Title>{product.name}</S.Title>
          <S.Link><img src={arrowLink} /></S.Link>
          </S.Content>
          <S.Content>
          <S.Price>
            <TaxedMoney taxedMoney={price} />
          </S.Price>
          <S.AddCartBtn>Add To Cart</S.AddCartBtn>
          </S.Content>
        </S.Details>
      </S.MobView> */}
    </S.Wrapper>
  );
};
