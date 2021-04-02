import { userFragment } from "@sdk/fragments/auth";
import gql from "graphql-tag";
import { TypedMutation } from "../../core/mutations";
import { ResetPassword, ResetPasswordVariables } from "./types/ResetPassword";
import { VerifyResetPassword, VerifyResetPasswordVariables } from "./types/VerifyResetPassword";

// fixme: this will be fixed in issue https://github.com/mirumee/saleor-storefront/issues/500
const passwordResetMutation = gql`
  ${userFragment}
  mutation ResetPassword($phone: String!) {
    accountForgotPassword(input: {phone: $phone}) {
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

export const TypedPasswordResetMutation = TypedMutation<
  ResetPassword,
  ResetPasswordVariables
>(passwordResetMutation);

const verifyPasswordResetMutation = gql`
  mutation VerifyResetPassword($smsCode:String!,$phone:String!,$newPassword:String!) {
    accountForgotVerify(input:{smsCode:$smsCode,phone:$phone,newPassword:$newPassword}) {
      errors {
        field
        message
      }
    }
  }
`;

export const TypedVerifyPasswordResetMutation = TypedMutation<
  VerifyResetPassword,
  VerifyResetPasswordVariables
>(verifyPasswordResetMutation);
