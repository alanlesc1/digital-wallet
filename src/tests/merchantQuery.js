export const CREATE_MERCHANT_QUERY = `mutation createMerchant($input: MerchantInput!) {
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

export const UPDATE_MERCHANT_QUERY = `mutation updateMerchant($C_Merchant_ID: ID!, $input: MerchantInput!) {
  updateMerchant(C_Merchant_ID: $C_Merchant_ID, input: $input) {
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

export const RETURN_MERCHANTS_QUERY = `query merchants($filter: MerchantFilter!) {
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

export const CREATE_MERCHANT_USER_QUERY = `mutation createMerchantUser($input: MerchantUserInput!) {
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

export const UPDATE_MERCHANT_USER_QUERY = `mutation updateMerchantUser($C_MerchantUser_ID: ID!, $input: MerchantUserInput!) {
  updateMerchantUser(C_MerchantUser_ID: $C_MerchantUser_ID, input: $input) {
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

export const RETURN_MERCHANT_USERS_QUERY = `query merchantUsers($filter: MerchantUserFilter!) {
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
