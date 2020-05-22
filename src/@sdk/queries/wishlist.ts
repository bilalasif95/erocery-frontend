import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";

import { wishlistItemFragment } from "../fragments/wishlist";

import { Wishlist, WishlistVariables } from "./types/Wishlist";

export const userWishlist = gql`
  ${wishlistItemFragment}
  query Wishlist {
    me {
      id
      wishlist(first: 100) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...WishlistItem
          }
        }
      }
    }
  }
`;

export const WishListQuery = TypedQuery<
  Wishlist,
  WishlistVariables
>(userWishlist);