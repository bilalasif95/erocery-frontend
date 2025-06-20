import gql from "graphql-tag";
import { userFragment } from "../fragments/auth";

export const changeUserPassword = gql`
  mutation PasswordChange($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors {
        field
        message
      }
    }
  }
`;

export const accountUpdate = gql`
  ${userFragment}
  mutation AccountUpdate($input: AccountInput!) {
    accountUpdate(input: $input) {
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

export const setPassword = gql`
  ${userFragment}
  mutation SetPassword($token: String!, $email: String!, $password: String!) {
    setPassword(token: $token, email: $email, password: $password) {
      errors {
        field
        message
      }
      token
      user {
        ...User
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const VerifyCode = gql`
  mutation AccountVerify($smsCode:String!,$phone:String!,$password:String!) {
    accountVerify(input:{smsCode:$smsCode,phone:$phone,password:$password}){
      errors {
        field
        message
      }
      token
    }
  }
`;

export const ResendSMSCode = gql`
  mutation AccountResendSms($phone:String!) {
    accountResendSms(phone:$phone){
      errors {
        field
        message
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
`;