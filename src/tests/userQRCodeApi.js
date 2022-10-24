import axios from 'axios';
import { API_URL } from './api';
import * as authApi from './authenticationApi';

const RETURN_MY_CURRENT_QRCODE_GRAPHQL = `query userCurrentQRCode($C_User_ID: ID!) {
  userCurrentQRCode(C_User_ID: $C_User_ID) {
    __typename
    ... on UserQRCode {
      schemaVersion
      dataType
    }

    ... on UserQRCodeResultError {
      message
    }

    ... on Error {
      message
    }
  }
}
`;

export const returnUserCurrentQrCode = async (token, variables) =>
  axios.post(API_URL, {
    query: RETURN_MY_CURRENT_QRCODE_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RENEW_MY_CURRENT_QRCODE_GRAPHQL = `mutation renewUserCurrentQRCode($C_User_ID: ID!) {
  renewUserCurrentQRCode(C_User_ID: $C_User_ID) {
        __typename
        ... on UserQRCode {
          schemaVersion
          dataType
        }
    
        ... on UserQRCodeResultError {
          message
        }
    
        ... on Error {
          message
        }
      }
    }
    `;

export const renewUserCurrentQrCode = async (token, variables) =>
  axios.post(API_URL, {
    query: RENEW_MY_CURRENT_QRCODE_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
