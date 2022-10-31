import { expect } from 'chai';
import * as api from './api';
import * as authQuery from './authenticationQuery';
import * as testData from './testData';
import * as userQRCodeQuery from './userQRCodeQuery';

describe('User current QR Code', function () {
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

  it('returns a UserQRCodeNotFoundError when current QR Code does not exist', async function () {
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

    const result = await api.request(userQRCodeQuery.RETURN_USER_CURRENT_QRCODE_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('renews user current QR Code', async function () {
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

    const result = await api.request(userQRCodeQuery.RENEW_USER_CURRENT_QRCODE_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });
});
