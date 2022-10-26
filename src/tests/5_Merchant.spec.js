import { expect } from 'chai';
import * as authApi from './authenticationApi';
import * as merchantApi from './merchantApi';

describe('Merchant', () => {
  let token;

  before(async () => {
    const loginVariables = {
      "email": authApi.DEFAULT_USER_EMAIL,
      "password": authApi.DEFAULT_USER_PASSWORD,
      "fcmToken": authApi.DEFAULT_USER_FCM_TOKEN
    };

    const loginToken = await authApi.loginToken(loginVariables);
    token = loginToken.data.data.login.token;
  });

  it('creates a new merchant', async () => {
    const variables = {
      "input": {
        "name": "Test Merchant",
        "documentType": "CNPJ",
        "documentNo": "07087842000171"
      }
    };

    const expectedResult = {
      "data": {
        "createMerchant": {
          "C_Merchant_ID": "1",
          "name": "Test Merchant"
        }
      }
    };

    const result = await merchantApi.createMerchant(token, variables);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of merchants', async () => {
    const variables = {
      "filter": {
        "publicId": "VDIXZF7CCBUN"
      }
    };

    const expectedResult = {
      "data": {
        "merchants": {
          "__typename": "Merchants",
          "merchants": []
        }
      }
    };

    const result = await merchantApi.returnMerchants(token, variables);
    expect(result.data).to.eql(expectedResult);
  });
});
