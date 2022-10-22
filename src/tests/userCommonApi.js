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

    ... on UserQRCodeResultError {
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
    
        ... on UserQRCodeResultError {
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

const CREATE_USER_WALLET_GRAPHQL = `mutation {
  createUserWallet(
    input: {
      name: "My Visa card"
      paymentMethod: "DRC"
      cardNumber: "1000000000000010"
      cardCVV: "1234"
      cardBrand: "visa"
      cardHolderName: "Test User"
      cardExpMonth: 12
      cardExpYear: 2030
      cardHolderDocumentType: "CPF"
      cardHolderDocumentNo: "78847950007"
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
    ... on UserWallet {
      C_UserWallet_ID
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const createUserWallet = async token =>
  axios.post(API_URL, {
    query: CREATE_USER_WALLET_GRAPHQL,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RETURN_USER_WALLET_GRAPHQL = `query userWallet($C_UserWallet_ID: ID!) {
  userWallet(C_UserWallet_ID: $C_UserWallet_ID) {
    __typename
    ... on UserWallet {
      C_UserWallet_ID
      name
    }
    ... on UserWalletResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const returnUserWallet = async (token, variables) =>
  axios.post(API_URL, {
    query: RETURN_USER_WALLET_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RETURN_USER_WALLETS_GRAPHQL = `query userWallets($C_User_ID: ID!) {
  userWallets(C_User_ID: $C_User_ID) {
    __typename
    ... on UserWallets {
      userWallets {
        C_UserWallet_ID
        name
      }
    }
    ... on UserWalletResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const returnUserWallets = async (token, variables) =>
  axios.post(API_URL, {
    query: RETURN_USER_WALLETS_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });