import React from "react";
// import Media from "react-media";
// import { ThemeContext } from "styled-components";

import { TaxedMoney } from "@components/containers";

import { Thumbnail } from "..";
import { generateProductUrl } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

export const OrderTabel: React.FC<IProps> = ({ orders, history }: IProps) => {
  return (
    <S.Wrapper>
      <table>
        <thead>
          <tr>
            <th>Index Number</th>
            <th>Products Ordered</th>
            <th>Date of Order</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map(order => {
              const apiDate = order.node.created.slice(0, 10);
              const date = new Date(apiDate);
              return (
                <tr
                  data-testid="order__row"
                  key={order.node.number}
                  onClick={evt => {
                    evt.stopPropagation();
                    order.node.lines[0].variant
                      ? history.push(`/order-history/${order.node.token}`)
                      : console.log("err");
                  }}
                >
                  <td>{order.node.number}</td>
                  <td>
                    {" "}
                    {order.node.lines.slice(0, 5).map((product: any) => (
                      <span
                        className="proImg"
                        key={product.variant && product.variant.product.id}
                        onClick={evt => {
                          evt.stopPropagation();
                          product.variant && product.variant.product.isPublished
                            ? history.push(
                                generateProductUrl(
                                  product.variant && product.variant.product.id,
                                  product.variant &&
                                    product.variant.product.name
                                )
                              )
                            : console.log("err");
                        }}
                      >
                        <Thumbnail source={product} />
                      </span>
                    ))}
                  </td>
                  <td>
                    {" "}
                    {`${date.getMonth() +
                      1}/${date.getDate()}/${date.getFullYear()}`}
                  </td>
                  <td>
                    <TaxedMoney taxedMoney={order.node.total} />
                  </td>
                  <td>{order.node.statusDisplay}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </S.Wrapper>
  );
};
