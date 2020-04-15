/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ResendSMSCode
// ====================================================

export interface ResendSMSCode_resendSMSCode_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface ResendSMSCode_resendSMSCode_user_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface ResendSMSCode_resendSMSCode_user_defaultShippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: ResendSMSCode_resendSMSCode_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface ResendSMSCode_resendSMSCode_user_defaultBillingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface ResendSMSCode_resendSMSCode_user_defaultBillingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: ResendSMSCode_resendSMSCode_user_defaultBillingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface ResendSMSCode_resendSMSCode_user_addresses_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface ResendSMSCode_resendSMSCode_user_addresses {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: ResendSMSCode_resendSMSCode_user_addresses_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface ResendSMSCode_resendSMSCode_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  defaultShippingAddress: ResendSMSCode_resendSMSCode_user_defaultShippingAddress | null;
  defaultBillingAddress: ResendSMSCode_resendSMSCode_user_defaultBillingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (ResendSMSCode_resendSMSCode_user_addresses | null)[] | null;
}

export interface ResendSMSCode_resendSMSCode_accountErrors {
  __typename: "AccountError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: AccountErrorCode | null;
}

export interface ResendSMSCode_resendSMSCode {
  __typename: "ResendSMSCode";
  errors: (ResendSMSCode_resendSMSCode_errors | null)[];
  /**
   * A user instance with new password.
   */
  user: ResendSMSCode_resendSMSCode_user | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  accountErrors: ResendSMSCode_resendSMSCode_accountErrors[] | null;
}

export interface ResendSMSCode {
  /**
   * Sets the user's password from the token sent by email using the RequestPasswordReset mutation.
   */
  accountResendSms: ResendSMSCode_resendSMSCode | null;
}

export interface ResendSMSCodeVariables {
  phone: string
}
