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

  describe('Return my current QR Code', () => {
    it('returns a UserQRCodeNotFoundError when current QR Code does not exist', async () => {
      const expectedResult = {
        "data": {
          "myCurrentQRCode": {
            "__typename": "UserQRCodeNotFoundError",
            "message": "QR Code not found"
          }
        }
      };

      const result = await userCommonApi.returnMyCurrentQrCode(token);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Renew my current QR Code', () => {
    it('renews my current QR Code', async () => {
      const expectedResult = {
        "data": {
          "renewMyCurrentQRCode": {
            "__typename": "UserQRCode",
            "schemaVersion": "1.0",
            "dataType": "PlainText"
          }
        }
      };

      const result = await userCommonApi.renewMyCurrentQrCode(token);
      expect(result.data).to.eql(expectedResult);
    });
  });
});
