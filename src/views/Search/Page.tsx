import "./scss/index.scss";

import * as React from "react";

import {
  useUserDetails
} from "@sdk/react";

import { IFilterAttributes, IFilters } from "@types";
// ProductsFeatured
import { DebounceChange,  TextField } from "../../components";

import { ProductListHeader } from "../../@next/components/molecules";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";

import ProductList from "../../@next/components/organisms/ProductList/ProductList";

import { maybe } from "../../core/utils";

import { CartContext } from "../../components/CartProvider/context";

import { SearchProducts_products } from "./types/SearchProducts";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  search?: string;
  setSearch?: (
    newValue: string,
    updateType?: "replace" | "replaceIn" | "push" | "pushIn"
  ) => void;
  products: SearchProducts_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  search,
  setSearch,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  // const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);
  const {data: user} = useUserDetails();
  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        .values.find(({ slug }) => valueSlug === slug).name,
      valueSlug,
    };
  };

  const activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );

  return (
    <div className="category">
      <div className="search-page">
        <div className="search-page__header">
          <div className="search-page__header__input container">
            <DebounceChange
              debounce={evt =>
                setSearch((evt.target.value as string).toLowerCase())
              }
              value={search}
              time={500}
            >
              {({ change, value }) => {
                return (
                  <TextField
                    autoFocus
                    label="Search term:"
                    onChange={change}
                    value={value}
                  />
                );
              }}
            </DebounceChange>
          </div>
        </div>
      </div>
      <div className="container">
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          onAttributeFiltersChange={onAttributeFiltersChange}
          attributes={attributes}
          filters={filters}
        />
        <ProductListHeader
          activeSortOption={activeSortOption}
          openFiltersMenu={() => setShowFilters(true)}
          numberOfProducts={products ? products.totalCount : 0}
          activeFilters={activeFilters}
          activeFiltersAttributes={activeFiltersAttributes}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
          onCloseFilterAttribute={onAttributeFiltersChange}
        />
        {canDisplayProducts && (
          <CartContext.Consumer>
            {cart => (
              <ProductList
                products={products.edges.map(edge => edge.node)}
                canLoadMore={hasNextPage}
                loading={displayLoader}
                onLoadMore={onLoadMore}
                addToCart={cart.add}
                user={user}
              />
            )}
          </CartContext.Consumer>
        )}
      </div>

      {/* {!hasProducts && 
      <CartContext.Consumer>
      {cart => (
        <ProductsFeatured addToCart={cart.add} user={user} />
        )}
      </CartContext.Consumer> */}
      
    </div>
  );
};

export default Page;
