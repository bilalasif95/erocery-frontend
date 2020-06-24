import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import { checkoutFragment } from "../../queries";
import {
  updateCheckoutShippingAddress,
  updateCheckoutShippingAddressVariables
} from "./types/updateCheckoutShippingAddress";

const updateCheckoutShippingAddressMutation = gql`
  ${checkoutFragment}
  mutation updateCheckoutShippingAddress(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
    $phone: String!
  ) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      errors {
        field
        message
      }
      checkout {
        ...Checkout
      }
    }
    checkoutEmailUpdate(checkoutId: $checkoutId, phone: $phone) {
      checkout {
        ...Checkout
      }
      errors {
        field
        message
      }
    }
  }
`;
export const TypedUpdateCheckoutShippingAddressMutation = TypedMutation<
  updateCheckoutShippingAddress,
  updateCheckoutShippingAddressVariables
>(updateCheckoutShippingAddressMutation);
