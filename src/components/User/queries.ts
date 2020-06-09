import gql from "graphql-tag";

import { checkoutAddressFragment } from "../../checkout/queries";
import { TypedMutation } from "../../core/mutations";
import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";
import { VerifyTokenAuth, VerifyTokenAuthVariables } from "./types/VerifyTokenAuth";

export const userFragment = gql`
  ${checkoutAddressFragment}
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
    isActive
    defaultShippingAddress {
      ...Address
    }
    defaultBillingAddress {
      ...Address
    }
    addresses {
      ...Address
    }
  }
`;

export const tokenAuthMutation = gql`
  ${userFragment}
  mutation TokenAuth($phone: String!, $password: String!) {
    tokenCreate(phone: $phone, password: $password) {
      token
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;

export const tokenVeryficationMutation = gql`
  ${userFragment}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      payload
      user {
        ...User
      }
    }
  }
`;

export const VerifyTokenAuthMutation = TypedMutation<
  VerifyTokenAuth,
  VerifyTokenAuthVariables
>(tokenVeryficationMutation);

export const TypedTokenAuthMutation = TypedMutation<
  TokenAuth,
  TokenAuthVariables
>(tokenAuthMutation);
