import axios from 'axios';
import { API_URL } from './api';

const RETURN_CURRENT_USER_GRAPHQL = `query me {
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

export const returnCurrentUser = async token =>
  axios.post(API_URL, {
    query: RETURN_CURRENT_USER_GRAPHQL
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RETURN_MY_CURRENT_QRCODE_GRAPHQL = `query myCurrentQRCode {
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

export const returnMyCurrentQrCode = async token =>
  axios.post(API_URL, {
    query: RETURN_MY_CURRENT_QRCODE_GRAPHQL,
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

