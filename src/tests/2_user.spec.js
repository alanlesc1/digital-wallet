import { expect } from 'chai';
import * as api from './api';
import * as authQuery from './authenticationQuery';
import * as testData from './testData';
import * as userQuery from './userQuery';

describe('User', function () {
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

  it('returns the current logged in user', async function () {
    const expectedResult = {
      "data": {
        "me": {
          "__typename": "User",
          "email": testData.DEFAULT_USER_EMAIL,
          "isActive": true,
          "name": testData.DEFAULT_USER_NAME,
        }
      }
    };

    const result = await api.request(userQuery.RETURN_CURRENT_USER_QUERY, null, token);
    expect(result.data).to.eql(expectedResult);
  });
});
