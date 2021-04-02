/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// import { ITaxedMoney } from "@temp/@next/types";

// ====================================================
// GraphQL query operation: Wishlist
// ====================================================

export interface Wishlist_me_wishlist_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface ProductVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface ProductVariant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Wishlist_me_wishlist_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  variants: {
    pricing: {
      price: {
        gross: {
          currency: string;
          amount: string;
        }
      }
    }
  }
  thumbnail: ProductVariant_product_thumbnail | null;
  thumbnail2x: ProductVariant_product_thumbnail2x | null;
}

export interface Wishlist_me_wishlist_edges_node {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: Wishlist_me_wishlist_edges_node_product;
}

export interface Wishlist_me_wishlist_edges {
  __typename: "WishlistItemCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Wishlist_me_wishlist_edges_node;
}

export interface Wishlist_me_wishlist {
  __typename: "WishlistItemCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: Wishlist_me_wishlist_pageInfo;
  edges: Wishlist_me_wishlist_edges[];
}

export interface Wishlist_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User's wishlist.
   */
  wishlist: Wishlist_me_wishlist | null;
}

export interface Wishlist {
  /**
   * Return the currently authenticated user.
   */
  me: Wishlist_me | null;
}

export interface WishlistVariables {
  after?: string | null;
  first?: number | null;
}
