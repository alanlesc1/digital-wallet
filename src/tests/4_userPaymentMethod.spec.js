import { expect } from 'chai';
import * as api from './api';
import { TIMEOUT } from './api';
import * as authQuery from './authenticationQuery';
import * as testData from './testData';
import * as userPaymentMethodQuery from './userPaymentMethodQuery';

describe('User Payment Method', function () {
  this.timeout(TIMEOUT);

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

  it('updates user, setting mandatory fields used by pagar.me', async function () {
    const variables = {
      "C_User_ID": "1",
      "input": {
        "isActive": true,
        "phone": testData.DEFAULT_USER_PHONE,
        "documentType": testData.DEFAULT_USER_DOCUMENT_TYPE,
        "documentNo": testData.DEFAULT_USER_DOCUMENT_NO
      }
    };

    const expectedResult = {
      "data": {
        "updateUser": {
          "__typename": "User",
          "C_User_ID": "1"
        }
      }
    };

    const result = await api.request(userPaymentMethodQuery.UPDATE_USER_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('creates a new user payment method for the current user', async function () {
    const variables = {
      "input": {
        "name": "My Visa card",
        "paymentMethod": "DRC",
        "cardNumber": "1000000000000010",
        "cardCVV": "1234",
        "cardBrand": "visa",
        "cardHolderName": testData.DEFAULT_USER_NAME,
        "cardExpMonth": 12,
        "cardExpYear": 2030,
        "cardHolderDocumentType": testData.DEFAULT_USER_DOCUMENT_TYPE,
        "cardHolderDocumentNo": testData.DEFAULT_USER_DOCUMENT_NO,
        "billingLocation": {
          "line1": "Av. Paulista",
          "line2": "100",
          "city": "São Paulo",
          "state": "SP",
          "country": "Brazil",
          "zipCode": "01310000"
        }
      }
    };

    const expectedResult = {
      "data": {
        "createUserPaymentMethod": {
          "C_UserPaymentMethod_ID": "1",
          "name": "My Visa card"
        }
      }
    };

    const result = await api.request(userPaymentMethodQuery.CREATE_USER_PAYMENT_METHOD_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of user payment methods', async function () {
    const variables = {
      "C_User_ID": "1"
    };

    const expectedResult = {
      "data": {
        "userPaymentMethods": {
          "__typename": "UserPaymentMethods",
          "userPaymentMethods": [
            {
              "C_UserPaymentMethod_ID": "1",
              "name": "My Visa card"
            }
          ]
        }
      }
    };

    const result = await api.request(userPaymentMethodQuery.RETURN_USER_PAYMENT_METHODS_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });
});
