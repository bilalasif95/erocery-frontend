import gql from "graphql-tag";

import { wishlistItemFragment } from "../fragments/wishlist";

import { TypedMutation } from "../../core/mutations";

import {
  AddRemoveBlogLike,
  AddRemoveBlogLikeVariables,
} from "./types/AddRemoveBlogLike";

export const addWhishlistProduct = gql`
  ${wishlistItemFragment}
  mutation AddWishlistProduct($productId: ID!) {
    wishlistAddProduct(productId: $productId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;

export const removeWhishlistProduct = gql`
  ${wishlistItemFragment}
  mutation RemoveWishlistProduct($productId: ID!) {
    wishlistRemoveProduct(productId: $productId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;

export const addWhishlistProductVariant = gql`
  ${wishlistItemFragment}
  mutation AddWishlistProductVariant($variantId: ID!) {
    wishlistAddVariant(variantId: $variantId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;

export const removeWhishlistProductVariant = gql`
  ${wishlistItemFragment}
  mutation RemoveWishlistProductVariant($variantId: ID!) {
    wishlistRemoveVariant(variantId: $variantId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;

const addRemoveBlogLike = gql`
  mutation AddRemoveBlogLike($id: ID!) {
    blogLikeDislike(id: $id) {
      blog{
        likes(first: 1) {
          totalCount
        }
        userLiked
      }
      blogErrors {
        field
        message
        code
      }
    }
  }
`;

export const TypedBlogLikeUnlikeMutation = TypedMutation<
  AddRemoveBlogLike,
  AddRemoveBlogLikeVariables
>(addRemoveBlogLike);