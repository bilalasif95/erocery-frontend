/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_requestPasswordReset_errors {
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

export interface ResetPassword_accountRegister_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  // email: string;
  phone: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
}

export interface ResetPassword_requestPasswordReset {
  __typename: "RequestPasswordReset";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: ResetPassword_requestPasswordReset_errors[] | null;
  user: ResetPassword_accountRegister_user | null;
}

export interface ResetPassword {
  /**
   * Sends an email with the account password modification link.
   */
  accountForgotPassword: ResetPassword_requestPasswordReset | null;
}

export interface ResetPasswordVariables {
  phone: string;
  // redirectUrl: string;
}
