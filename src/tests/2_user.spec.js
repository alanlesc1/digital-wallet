import { expect } from 'chai';
import * as authApi from './authenticationApi';
import * as userApi from './userApi';

describe('User', () => {
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

  it('returns the current logged in user', async () => {
    const expectedResult = {
      "data": {
        "me": {
          "__typename": "User",
          "email": authApi.DEFAULT_USER_EMAIL,
          "isActive": true,
          "name": authApi.DEFAULT_USER_NAME,
        }
      }
    };

    const result = await userApi.returnCurrentUser(token);
    expect(result.data).to.eql(expectedResult);
  });
});
