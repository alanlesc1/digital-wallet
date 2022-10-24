import { expect } from 'chai';
import * as authApi from './authenticationApi';
import * as userCommonApi from './userCommonApi';

describe('User Common', () => {
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

  describe('Return current user', () => {
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

      const result = await userCommonApi.returnCurrentUser(token);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Return user current QR Code', () => {
    it('returns a UserQRCodeNotFoundError when current QR Code does not exist', async () => {
      const variables = {
        "C_User_ID": "1"
      };

      const expectedResult = {
        "data": {
          "userCurrentQRCode": {
            "__typename": "UserQRCodeNotFoundError",
            "message": "User QR Code not found"
          }
        }
      };

      const result = await userCommonApi.returnUserCurrentQrCode(token, variables);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Renew user current QR Code', () => {
    it('renews user current QR Code', async () => {
      const variables = {
        "C_User_ID": "1"
      };

      const expectedResult = {
        "data": {
          "renewUserCurrentQRCode": {
            "__typename": "UserQRCode",
            "schemaVersion": "1.0",
            "dataType": "PlainText"
          }
        }
      };

      const result = await userCommonApi.renewUserCurrentQrCode(token, variables);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Create user wallet', () => {
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

      const result = await userCommonApi.updateUser(token, variables);
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

      const result = await userCommonApi.createUserWallet(token);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Return user wallet', () => {
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

      const result = await userCommonApi.returnUserWallet(token, variables);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Return user wallets', () => {
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

      const result = await userCommonApi.returnUserWallets(token, variables);
      expect(result.data).to.eql(expectedResult);
    });
  });
});
