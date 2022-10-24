import { expect } from 'chai';
import * as authApi from './authenticationApi';
import * as userQRCodeApi from './userQRCodeApi';

describe('User current QR Code', () => {
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

    const result = await userQRCodeApi.returnUserCurrentQrCode(token, variables);
    expect(result.data).to.eql(expectedResult);
  });

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

    const result = await userQRCodeApi.renewUserCurrentQrCode(token, variables);
    expect(result.data).to.eql(expectedResult);
  });
});
