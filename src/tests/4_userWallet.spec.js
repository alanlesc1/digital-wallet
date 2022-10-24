import { expect } from 'chai';
import * as authApi from './authenticationApi';
import * as userWalletApi from './userWalletApi';

describe('User Wallet', () => {
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

    const result = await userWalletApi.updateUser(token, variables);
    expect(result.data).to.eql(expectedResult);
  });

  it('creates a new user wallet for the current user', async () => {
    const expectedResult = {
      "data": {
        "createUserWallet": {
          "C_UserWallet_ID": "1",
          "name": "My Visa card"
        }
      }
    };

    const result = await userWalletApi.createUserWallet(token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns one user wallet', async () => {
    const variables = {
      "C_UserWallet_ID": "1"
    };

    const expectedResult = {
      "data": {
        "userWallet": {
          "__typename": "UserWallet",
          "C_UserWallet_ID": "1",
          "name": "My Visa card"
        }
      }
    };

    const result = await userWalletApi.returnUserWallet(token, variables);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of user wallets', async () => {
    const variables = {
      "C_User_ID": "1"
    };

    const expectedResult = {
      "data": {
        "userWallets": {
          "__typename": "UserWallets",
          "userWallets": [
            {
              "C_UserWallet_ID": "1",
              "name": "My Visa card"
            }
          ]
        }
      }
    };

    const result = await userWalletApi.returnUserWallets(token, variables);
    expect(result.data).to.eql(expectedResult);
  });
});
