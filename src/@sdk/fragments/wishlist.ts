import gql from "graphql-tag";

export const wishlistItemFragment = gql`
  fragment WishlistItem on WishlistItem {
    id
    product {
      id
      name
      variants{
        id
        pricing{
          price{
          gross{
            amount
            currency
          }
          }
        }
      }
      thumbnail {
        url
        alt
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
    }
  }
`;
