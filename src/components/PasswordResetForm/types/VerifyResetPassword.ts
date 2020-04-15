/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyResetPassword
// ====================================================

export interface VerifyResetPassword_requestPasswordReset_errors {
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

export interface VerifyResetPassword_requestPasswordReset {
  __typename: "RequestPasswordReset";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: VerifyResetPassword_requestPasswordReset_errors[] | null;
}

export interface VerifyResetPassword {
  /**
   * Sends an email with the account password modification link.
   */
  accountForgotVerify: VerifyResetPassword_requestPasswordReset | null;
}

export interface VerifyResetPasswordVariables {
  smsCode: string;
  phone: string;
  newPassword: string;
}
