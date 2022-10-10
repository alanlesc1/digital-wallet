import axios from 'axios';
import { API_URL } from './api';

const RETRIEVE_CURRENT_USER_GRAPHQL = `query currentUser {
  currentUser {
    __typename
    ... on User {
      isActive
      name
      email
    }

    ... on NotAuthenticatedError {
      message
    }

    ... on Error {
      message
    }
  }
}
`;

export const retrieveCurrentUser = async token =>
  axios.post(API_URL, {
    query: RETRIEVE_CURRENT_USER_GRAPHQL
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RETRIEVE_OR_RENEW_USER_QRCODE_GRAPHQL = `mutation userQRCode ($renew: Boolean) {
  userQRCode (renew: $renew) {
    __typename
    ... on UserQRCode {
      schemaVersion
      dataType
    }

    ... on UserQRCodeError {
      message
    }

    ... on Error {
      message
    }
  }
}
`;

export const retrieveOrRenewUserQrCode = async (variables, token) =>
  axios.post(API_URL, {
    query: RETRIEVE_OR_RENEW_USER_QRCODE_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
