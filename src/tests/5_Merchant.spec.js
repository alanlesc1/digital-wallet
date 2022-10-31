import { expect } from 'chai';
import * as api from './api';
import * as authQuery from './authenticationQuery';
import * as merchantQuery from './merchantQuery';
import * as testData from './testData';

describe('Merchant', function () {
  let token;

  before(async function () {
    const loginVariables = {
      "email": testData.DEFAULT_USER_EMAIL,
      "password": testData.DEFAULT_USER_PASSWORD,
      "fcmToken": testData.DEFAULT_USER_FCM_TOKEN
    };

    const loginToken = await api.request(authQuery.LOGIN_TOKEN_QUERY, loginVariables, null);
    token = loginToken.data.data.login.token;
  });

  it('creates a new merchant', async function () {
    const variables = {
      "input": {
        "name": testData.DEFAULT_MERCHANT_NAME,
        "documentType": testData.DEFAULT_MERCHANT_DOCUMENT_TYPE,
        "documentNo": testData.DEFAULT_MERCHANT_DOCUMENT_NO
      }
    };

    const expectedResult = {
      "data": {
        "createMerchant": {
          "C_Merchant_ID": "1",
          "name": testData.DEFAULT_MERCHANT_NAME
        }
      }
    };

    const result = await api.request(merchantQuery.CREATE_MERCHANT_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('updates a merchant', async function () {
    const variables = {
      "C_Merchant_ID": 1,
      "input": {
        "isActive": true,
        "name": testData.DEFAULT_MERCHANT_NAME,
        "documentType": testData.DEFAULT_MERCHANT_DOCUMENT_TYPE,
        "documentNo": testData.DEFAULT_MERCHANT_DOCUMENT_NO
      }
    };

    const expectedResult = {
      "data": {
        "updateMerchant": {
          "C_Merchant_ID": "1",
          "name": testData.DEFAULT_MERCHANT_NAME
        }
      }
    };

    const result = await api.request(merchantQuery.UPDATE_MERCHANT_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of merchants', async function () {
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

    const result = await api.request(merchantQuery.RETURN_MERCHANTS_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('creates a new merchant user', async function () {
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
            "name": testData.DEFAULT_MERCHANT_NAME
          },
          "user": {
            "name": testData.DEFAULT_USER_NAME
          }
        }
      }
    };

    const result = await api.request(merchantQuery.CREATE_MERCHANT_USER_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('updates a merchant user', async function () {
    const variables = {
      "C_MerchantUser_ID": 1,
      "input": {
        "isActive": true,
        "C_Merchant_ID": 1,
        "C_User_ID": 1
      }
    };

    const expectedResult = {
      "data": {
        "updateMerchantUser": {
          "merchant": {
            "name": testData.DEFAULT_MERCHANT_NAME
          },
          "user": {
            "name": testData.DEFAULT_USER_NAME
          }
        }
      }
    };

    const result = await api.request(merchantQuery.UPDATE_MERCHANT_USER_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of merchant users', async function () {
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
                "name": testData.DEFAULT_MERCHANT_NAME
              },
              "user": {
                "name": testData.DEFAULT_USER_NAME
              }
            }
          ]
        }
      }
    };

    const result = await api.request(merchantQuery.RETURN_MERCHANT_USERS_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });
});
