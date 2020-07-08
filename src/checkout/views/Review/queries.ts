import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import {
  completeCheckout,
  completeCheckoutVariables
} from "./types/completeCheckout";

const completeCheckoutMutation = gql`
  mutation completeCheckout($checkoutId: ID!) {
    checkoutComplete(checkoutId: $checkoutId) {
      errors {
        field
        message
      }
      order {
        id
        total {
          gross {
            amount
          }
        }
        lines {
           productName
           unitPrice {
             gross {
               amount
             }
           }
           variant {
             product {
               category {
                 name
               }
             }
           }
           quantity
        }
        token
      }
    }
  }
`;

export const TypedCompleteCheckoutMutation = TypedMutation<
  completeCheckout,
  completeCheckoutVariables
>(completeCheckoutMutation);
