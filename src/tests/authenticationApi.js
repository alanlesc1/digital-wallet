import axios from 'axios';
import { API_URL } from './api';

export const DEFAULT_USER_NAME = "Test User";
export const DEFAULT_USER_EMAIL = "test@easytrackpay.com";
export const DEFAULT_USER_PASSWORD = "123456";
export const DEFAULT_USER_FCM_TOKEN = "MYTOKEN";
export const DEFAULT_USER_PHONE = "+551199991234";
export const DEFAULT_USER_DOCUMENT_TYPE = "CPF";
export const DEFAULT_USER_DOCUMENT_NO = "78847950007";

export const DEFAULT_MERCHANT_NAME = "Test Merchant";
export const DEFAULT_MERCHANT_DOCUMENT_TYPE = "CNPJ";
export const DEFAULT_MERCHANT_DOCUMENT_NO = "07087842000171";

export const DEFAULT_EVENT_NAME = "Test Event";
export const DEFAULT_EVENT_START_DATE = "2030-12-31 00:00:00";
export const DEFAULT_EVENT_END_DATE = "2030-12-31 23:59:59";

const SIGNUP_GRAPHQL = `mutation signup($name: String!, $email: String!, $password: String!) {
  signup(name: $name, email: $email, password: $password) {
    __typename
    ... on SignupResultSuccess {
      user {
        isActive
        name
        email
        isUserVerified
      }
    }

    ... on SignupResultError {
      message
    }
  }
}
`;

export const signup = async variables =>
  axios.post(API_URL, {
    query: SIGNUP_GRAPHQL,
    variables,
  });

const GENERATE_VERIFICATION_CODE_GRAPHQL = `mutation generateUserVerification($email: String!, $password: String!) {
  verifyUser(email: $email, password: $password) {
    __typename
    ... on UserVerificationResultSuccess {
      user {
        isActive
        name
        email
        isUserVerified
      }
    }

    ... on UserVerificationResultError {
      message
    }
  }
}
`;

export const generateVerificationCode = async variables =>
  axios.post(API_URL, {
    query: GENERATE_VERIFICATION_CODE_GRAPHQL,
    variables,
  });

const VERIFY_USER_GRAPHQL = `mutation verifyUser(
  $email: String!
  $password: String!
  $verificationCode: String
) {
  verifyUser(
    email: $email
    password: $password
    verificationCode: $verificationCode
  ) {
    __typename
    ... on UserVerificationResultSuccess {
      user {
        isActive
        name
        email
        isUserVerified
      }
    }

    ... on UserVerificationResultError {
      message
    }
  }
}
`;

export const verifyUser = async variables =>
  axios.post(API_URL, {
    query: VERIFY_USER_GRAPHQL,
    variables,
  });

const LOGIN_GRAPHQL = `mutation login($email: String!, $password: String!, $fcmToken: String!) {
  login(email: $email, password: $password, fcmToken: $fcmToken) {
    __typename
    ... on LoginResultSuccess {
      user {
        isActive
        name
        email
        userRoles {
          isActive
          roleName
        }
      }
    }

    ... on LoginResultError {
      message
    }
  }
}
`;

export const login = async variables =>
  axios.post(API_URL, {
    query: LOGIN_GRAPHQL,
    variables,
  });

const LOGIN_TOKEN_GRAPHQL = `mutation login($email: String!, $password: String!, $fcmToken: String!) {
    login(email: $email, password: $password, fcmToken: $fcmToken) {
      __typename
      ... on LoginResultSuccess {
        token
      }
  
      ... on LoginResultError {
        message
      }
    }
  }
  `;

export const loginToken = async variables =>
  axios.post(API_URL, {
    query: LOGIN_TOKEN_GRAPHQL,
    variables,
  });