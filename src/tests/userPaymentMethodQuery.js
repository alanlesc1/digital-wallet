export const UPDATE_USER_QUERY = `mutation updateUser($C_User_ID: ID!, $input: UserInput!) {
  updateUser(
      C_User_ID: $C_User_ID,
      input: $input
  ) {
      __typename
    ... on User {
      C_User_ID
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const CREATE_USER_PAYMENT_METHOD_QUERY = `mutation createUserPaymentMethod($input: UserPaymentMethodInput!) {
  createUserPaymentMethod(input: $input) {
    ... on UserPaymentMethod {
      C_UserPaymentMethod_ID
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const RETURN_USER_PAYMENT_METHODS_QUERY = `query userPaymentMethods($C_User_ID: ID!) {
  userPaymentMethods(
    filter: {
      C_User_ID: $C_User_ID
    }) {
    __typename
    ... on UserPaymentMethods {
      userPaymentMethods {
        C_UserPaymentMethod_ID
        name
      }
    }
    ... on UserPaymentMethodResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;
