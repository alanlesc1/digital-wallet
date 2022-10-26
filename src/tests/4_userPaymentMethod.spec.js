import { expect } from 'chai';
import * as authApi from './authenticationApi';
import * as userPaymentMethodApi from './userPaymentMethodApi';

describe('User Payment Method', () => {
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

  it('updates user, setting mandatory fields used by pagar.me', async () => {
    const variables = {
      "C_User_ID": "1"
    };

    const expectedResult = {
      "data": {
        "updateUser": {
          "__typename": "User",
          "C_User_ID": "1"
        }
      }
    };

    const result = await userPaymentMethodApi.updateUser(token, variables);
    expect(result.data).to.eql(expectedResult);
  });

  it('creates a new user payment method for the current user', async () => {
    const expectedResult = {
      "data": {
        "createUserPaymentMethod": {
          "C_UserPaymentMethod_ID": "1",
          "name": "My Visa card"
        }
      }
    };

    const result = await userPaymentMethodApi.createUserPaymentMethod(token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of user payment methods', async () => {
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

    const result = await userPaymentMethodApi.returnUserPaymentMethods(token, variables);
    expect(result.data).to.eql(expectedResult);
  });
});
