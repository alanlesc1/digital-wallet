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

const CREATE_MERCHANT_USER_GRAPHQL = `mutation createMerchantUser($input: MerchantUserInput!) {
  createMerchantUser(input: $input) {
    ... on MerchantUser {
      merchant {
          name
      }
      user {
          name
      }
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const createMerchantUser = async (token, variables) =>
  axios.post(API_URL, {
    query: CREATE_MERCHANT_USER_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RETURN_MERCHANT_USERS_GRAPHQL = `query merchantUsers($filter: MerchantUserFilter!) {
  merchantUsers(filter: $filter) {
    __typename
    ... on MerchantUsers {
      merchantUsers {
        merchant {
            name
        }
        user {
            name
        }
      }
    }
    ... on MerchantUserResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const returnMerchantUsers = async (token, variables) =>
  axios.post(API_URL, {
    query: RETURN_MERCHANT_USERS_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });