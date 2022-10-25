import axios from 'axios';
import { API_URL } from './api';
import * as authApi from './authenticationApi';

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
    query: RETURN_CURRENT_USER_GRAPHQL,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

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

const UPDATE_USER_GRAPHQL = `mutation updateUser($C_User_ID: ID!) {
  updateUser(
      C_User_ID: $C_User_ID,
      input: {
        phone: "${authApi.DEFAULT_USER_PHONE}"
        documentType: "${authApi.DEFAULT_USER_DOCUMENT_TYPE}"
        documentNo: "${authApi.DEFAULT_USER_DOCUMENT_NO}"
    }
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

export const updateUser = async (token, variables) =>
  axios.post(API_URL, {
    query: UPDATE_USER_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const CREATE_USER_PAYMENT_METHOD_GRAPHQL = `mutation {
  createUserPaymentMethod(
    input: {
      name: "My Visa card"
      paymentMethod: "DRC"
      cardNumber: "1000000000000010"
      cardCVV: "1234"
      cardBrand: "visa"
      cardHolderName: "Test User"
      cardExpMonth: 12
      cardExpYear: 2030
      cardHolderDocumentType: "${authApi.DEFAULT_USER_DOCUMENT_TYPE}"
      cardHolderDocumentNo: "${authApi.DEFAULT_USER_DOCUMENT_NO}"
      billingLocation: {
        line1: "Av. Paulista"
        line2: "100"
        city: "São Paulo"
        state: "SP"
        country: "Brazil"
        zipCode: "01310000"
      }
    }
  ) {
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

export const createUserPaymentMethod = async token =>
  axios.post(API_URL, {
    query: CREATE_USER_PAYMENT_METHOD_GRAPHQL,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RETURN_USER_PAYMENT_METHOD_GRAPHQL = `query userPaymentMethod($C_UserPaymentMethod_ID: ID!) {
  userPaymentMethod(C_UserPaymentMethod_ID: $C_UserPaymentMethod_ID) {
    __typename
    ... on UserPaymentMethod {
      C_UserPaymentMethod_ID
      name
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

export const returnUserPaymentMethod = async (token, variables) =>
  axios.post(API_URL, {
    query: RETURN_USER_PAYMENT_METHOD_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RETURN_USER_PAYMENT_METHODS_GRAPHQL = `query userPaymentMethods($C_User_ID: ID!) {
  userPaymentMethods(C_User_ID: $C_User_ID) {
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

export const returnUserPaymentMethods = async (token, variables) =>
  axios.post(API_URL, {
    query: RETURN_USER_PAYMENT_METHODS_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });