import axios from 'axios';
import { API_URL } from './api';

const RETRIEVE_CURRENT_USER_GRAPHQL = `query me {
  me {
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

const RETRIEVE_MY_CURRENT_QRCODE_GRAPHQL = `query myCurrentQRCode {
  myCurrentQRCode {
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

export const retrieveMyCurrentQrCode = async token =>
  axios.post(API_URL, {
    query: RETRIEVE_MY_CURRENT_QRCODE_GRAPHQL,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RENEW_MY_CURRENT_QRCODE_GRAPHQL = `mutation renewMyCurrentQRCode {
  renewMyCurrentQRCode {
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

export const renewMyCurrentQrCode = async token =>
  axios.post(API_URL, {
    query: RENEW_MY_CURRENT_QRCODE_GRAPHQL,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

