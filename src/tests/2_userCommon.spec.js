import { expect } from 'chai';
import * as authApi from './authenticationApi';
import * as userCommonApi from './userCommonApi';

describe('User Common', () => {
  let token;

  before(async () => {
    const loginVariables = {
      "email": authApi.DEFAULT_USER_EMAIL,
      "password": authApi.DEFAULT_USER_PASSWORD
    };

    const loginToken = await authApi.loginToken(loginVariables);
    token = loginToken.data.data.login.token;
  });

  describe('Retrieve current user', () => {
    it('returns the current logged in user', async () => {
      const expectedResult = {
        "data": {
          "currentUser": {
            "__typename": "User",
            "email": authApi.DEFAULT_USER_EMAIL,
            "isActive": true,
            "name": authApi.DEFAULT_USER_NAME,
          }
        }
      };

      const result = await userCommonApi.retrieveCurrentUser(token);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Retrieve/renew user QR Code', () => {
    it('creates a new user QR Code', async () => {
      const variables = {
        "renew": false
      };

      const expectedResult = {
        "data": {
          "userQRCode": {
            "__typename": "UserQRCode",
            "schemaVersion": "1.0",
            "dataType": "PlainText"
          }
        }
      };

      const result = await userCommonApi.retrieveOrRenewUserQrCode(variables, token);
      expect(result.data).to.eql(expectedResult);
    });

    it('renews the user QR Code', async () => {
      const variables = {
        "renew": true
      };

      const expectedResult = {
        "data": {
          "userQRCode": {
            "__typename": "UserQRCode",
            "schemaVersion": "1.0",
            "dataType": "PlainText"
          }
        }
      };

      const result = await userCommonApi.retrieveOrRenewUserQrCode(variables, token);
      expect(result.data).to.eql(expectedResult);
    });
  });
});
