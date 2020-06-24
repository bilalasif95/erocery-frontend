import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { useUserDetails } from "@sdk/react";

import ProductList from "./ProductList";

import { PRODUCTS } from "./fixtures";

const { data: user } = useUserDetails();

describe("<ProductList />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <ProductList
          products={PRODUCTS}
          canLoadMore={true}
          loading={false}
          onLoadMore={jest.fn()}
          addToCart={jest.fn()}
          user={user}
        />
      </BrowserRouter>
    );

    expect(wrapper.exists()).toEqual(true);
  });
  it("show loading", () => {
    const wrapper = mount(
      <BrowserRouter>
        <ProductList
          products={PRODUCTS}
          canLoadMore={true}
          loading={true}
          onLoadMore={jest.fn()}
          addToCart={jest.fn()}
          user={user}
        />
      </BrowserRouter>
    );

    expect(wrapper.text()).not.toContain("More +");
  });
  it("may load more", () => {
    const handleLoadMore = jest.fn();

    const wrapper = mount(
      <BrowserRouter>
        <ProductList
          products={PRODUCTS}
          canLoadMore={true}
          loading={false}
          onLoadMore={handleLoadMore}
          addToCart={jest.fn()}
          user={user}
        />
      </BrowserRouter>
    );

    expect(wrapper.text()).toContain("More +");

    wrapper.find("button").simulate("click");

    expect(handleLoadMore).toHaveBeenCalled();
  });
});
