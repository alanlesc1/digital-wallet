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
        "name": authApi.DEFAULT_MERCHANT_NAME,
        "documentType": authApi.DEFAULT_MERCHANT_DOCUMENT_TYPE,
        "documentNo": authApi.DEFAULT_MERCHANT_DOCUMENT_NO
      }
    };

    const expectedResult = {
      "data": {
        "createMerchant": {
          "C_Merchant_ID": "1",
          "name": authApi.DEFAULT_MERCHANT_NAME
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

  it('creates a new merchant user', async () => {
    const variables = {
      "input": {
        "C_Merchant_ID": 1,
        "C_User_ID": 1
      }
    };

    const expectedResult = {
      "data": {
        "createMerchantUser": {
          "merchant": {
            "name": authApi.DEFAULT_MERCHANT_NAME
          },
          "user": {
            "name": authApi.DEFAULT_USER_NAME
          }
        }
      }
    };

    const result = await merchantApi.createMerchantUser(token, variables);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of merchant users', async () => {
    const variables = {
      "filter": {
        "C_Merchant_ID": 1
      }
    };

    const expectedResult = {
      "data": {
        "merchantUsers": {
          "__typename": "MerchantUsers",
          "merchantUsers": [
            {
              "merchant": {
                "name": authApi.DEFAULT_MERCHANT_NAME
              },
              "user": {
                "name": authApi.DEFAULT_USER_NAME
              }
            }
          ]
        }
      }
    };

    const result = await merchantApi.returnMerchantUsers(token, variables);
    expect(result.data).to.eql(expectedResult);
  });
});
