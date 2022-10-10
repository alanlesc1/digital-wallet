import axios from 'axios';
import { API_URL } from './api';

const SIGNUP_GRAPHQL = `mutation signUp($name: String!, $email: String!, $password: String!) {
  signUp(name: $name, email: $email, password: $password) {
    __typename
    ... on SignUpResultSuccess {
      user {
        isActive
        name
        email
        isUserVerified
      }
    }

    ... on SignUpResultError {
      message
    }
  }
}
`;

export const signUp = async variables =>
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

const LOGIN_GRAPHQL = `mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    __typename
    ... on LoginResultSuccess {
      user {
        isActive
        name
        email
        userRoles {
          isActive
          role
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

const LOGIN_TOKEN_GRAPHQL = `mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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