import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";

import { TypedMutation } from "../../core/mutations";
import { AccountConfirm, AccountConfirmVariables } from "./types/AccountConfirm";

import { UserDetails, UserDetails_me } from "../../@sdk/queries/types/UserDetails";

import { userFragment } from "../../@sdk/fragments/auth";

const accountConfirmMutation = gql`
  mutation confirmAccount($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      errors {
        field
        message
      }
    }
  }
`;

export const TypedAccountConfirmMutation = TypedMutation<
  AccountConfirm,
  AccountConfirmVariables
>(accountConfirmMutation);


export const userAllAdddresses = gql`
  ${userFragment}
  query {
    me{
      ...User
    }
  }
`;

export const UserAllAddressesQuery = TypedQuery<
  UserDetails,
  UserDetails_me
>(userAllAdddresses);
