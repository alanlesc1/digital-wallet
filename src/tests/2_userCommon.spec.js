import { expect } from 'chai';
import * as authApi from './authenticationApi';
import * as userCommonApi from './userCommonApi';

describe('User Common', () => {
  describe('Retrieve current user', () => {
    it('returns the current logged in user', async () => {
      const variables = {
        "email": "test@easytrackpay.com",
        "password": "123456"
      };

      const expectedResult = {
        "data": {
          "currentUser": {
            "__typename": "User",
            "email": "test@easytrackpay.com",
            "isActive": true,
            "name": "Test User",
          }
        }
      };

      const {
        data: {
          data: {
            login: { token },
          },
        },
      } = await authApi.loginToken(variables);

      const result = await userCommonApi.retrieveCurrentUser(token);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Retrieve/renew user QR Code', () => {
    it('creates a new user QR Code', async () => {
      const loginVariables = {
        "email": "test@easytrackpay.com",
        "password": "123456"
      };

      const requestVariables = {
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

      const {
        data: {
          data: {
            login: { token },
          },
        },
      } = await authApi.loginToken(loginVariables);

      const result = await userCommonApi.retrieveOrRenewUserQrCode(requestVariables, token);
      expect(result.data).to.eql(expectedResult);
    });

    it('renews the user QR Code', async () => {
      const loginVariables = {
        "email": "test@easytrackpay.com",
        "password": "123456"
      };

      const requestVariables = {
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

      const {
        data: {
          data: {
            login: { token },
          },
        },
      } = await authApi.loginToken(loginVariables);

      const result = await userCommonApi.retrieveOrRenewUserQrCode(requestVariables, token);
      expect(result.data).to.eql(expectedResult);
    });
  });
});
