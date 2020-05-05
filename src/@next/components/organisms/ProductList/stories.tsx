import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import {
  useUserDetails
} from "@sdk/react";

import ProductList  from "./ProductList";

import { PRODUCTS } from "./fixtures";

const {data: user} = useUserDetails();

storiesOf("@components/organisms/ProductList", module)
  .addParameters({ component: ProductList })
  .add("default", () => (
    <BrowserRouter>
      <ProductList
        products={PRODUCTS}
        canLoadMore={true}
        loading={false}
        onLoadMore={() => null}
        addToCart={()=>null}
        user={user}
      />
    </BrowserRouter>
  ));
