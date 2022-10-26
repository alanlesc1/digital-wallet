import axios from 'axios';
import { API_URL } from './api';

const CREATE_MERCHANT_GRAPHQL = `mutation createMerchant($input: MerchantInput!) {
  createMerchant(input: $input) {
    ... on Merchant {
      C_Merchant_ID
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const createMerchant = async (token, variables) =>
  axios.post(API_URL, {
    query: CREATE_MERCHANT_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RETURN_MERCHANTS_GRAPHQL = `query merchants($filter: MerchantFilter!) {
  merchants(filter: $filter) {
    __typename
    ... on Merchants {
      merchants {
        name
      }
    }
    ... on MerchantResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const returnMerchants = async (token, variables) =>
  axios.post(API_URL, {
    query: RETURN_MERCHANTS_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
