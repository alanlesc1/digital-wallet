import { expect } from 'chai';
import * as authQuery from './authenticationQuery';
import * as testData from './testData';
import * as api from './api';
import { sequelize, MUser, MUserRole } from '../db/models';

describe('Authentication', function () {
  describe('Signup', function () {
    it('returns a SignupResultSuccess when user can be created', async function () {
      const variables = {
        "name": testData.DEFAULT_USER_NAME,
        "email": testData.DEFAULT_USER_EMAIL,
        "password": testData.DEFAULT_USER_PASSWORD
      };

      const expectedResult = {
        "data": {
          "signup": {
            "__typename": "SignupResultSuccess",
            "user": {
              "isActive": true,
              "name": testData.DEFAULT_USER_NAME,
              "email": testData.DEFAULT_USER_EMAIL,
              "isUserVerified": false
            }
          }
        }
      };

      const result = await api.request(authQuery.SIGNUP_QUERY, variables, null);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a SignupResultError when user already exists', async function () {
      const variables = {
        "name": testData.DEFAULT_USER_NAME,
        "email": testData.DEFAULT_USER_EMAIL,
        "password": testData.DEFAULT_USER_PASSWORD
      };

      const expectedResult = {
        "data": {
          "signup": {
            "__typename": "SignupResultError",
            "message": "email must be unique"
          }
        }
      };

      const result = await api.request(authQuery.SIGNUP_QUERY, variables, null);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Generate verification code', function () {
    it('returns a UserVerificationResultError when is a invalid email/password', async function () {
      const variables = {
        "email": testData.DEFAULT_USER_EMAIL,
        "password": "wrongPassword"
      };

      const expectedResult = {
        "data": {
          "verifyUser": {
            "__typename": "UserVerificationResultError",
            "message": "Invalid email/password"
          }
        }
      };

      const result = await api.request(authQuery.GENERATE_VERIFICATION_CODE_QUERY, variables, null);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a UserVerificationResultSuccess when verification code was generated', async function () {
      const variables = {
        "email": testData.DEFAULT_USER_EMAIL,
        "password": testData.DEFAULT_USER_PASSWORD
      };

      const expectedResult = {
        "data": {
          "verifyUser": {
            "__typename": "UserVerificationResultSuccess",
            "user": {
              "isActive": true,
              "name": testData.DEFAULT_USER_NAME,
              "email": testData.DEFAULT_USER_EMAIL,
              "isUserVerified": false
            }
          }
        }
      };

      const result = await api.request(authQuery.GENERATE_VERIFICATION_CODE_QUERY, variables, null);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Verify verification code', function () {
    it('returns a UserVerificationResultError when verification code is invalid', async function () {
      await sequelize.query('UPDATE C_User SET VerificationCode = ? WHERE Email = ?',
        {
          replacements: ["1111", testData.DEFAULT_USER_EMAIL]
        });

      const variables = {
        "email": testData.DEFAULT_USER_EMAIL,
        "password": testData.DEFAULT_USER_PASSWORD,
        "verificationCode": "0000"
      };

      const expectedResult = {
        "data": {
          "verifyUser": {
            "__typename": "UserVerificationResultError",
            "message": "Verification code is invalid"
          }
        }
      };

      const result = await api.request(authQuery.VERIFY_USER_QUERY, variables, null);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a UserVerificationResultError when verification code is expired', async function () {
      await sequelize.query("UPDATE C_User SET VerificationCodeExp = NOW() - INTERVAL '1 DAY' WHERE Email = ?",
        {
          replacements: [testData.DEFAULT_USER_EMAIL]
        });

      const variables = {
        "email": testData.DEFAULT_USER_EMAIL,
        "password": testData.DEFAULT_USER_PASSWORD,
        "verificationCode": "1111"
      };

      const expectedResult = {
        "data": {
          "verifyUser": {
            "__typename": "UserVerificationResultError",
            "message": "Verification code expired"
          }
        }
      };

      const result = await api.request(authQuery.VERIFY_USER_QUERY, variables, null);
      expect(result.data).to.eql(expectedResult);

      await sequelize.query("UPDATE C_User SET VerificationCodeExp = NOW() + INTERVAL '1 DAY' WHERE Email = ?",
        {
          replacements: [testData.DEFAULT_USER_EMAIL]
        });
    });

    it('returns a UserVerificationResultSuccess when verification code is valid', async function () {
      const variables = {
        "email": testData.DEFAULT_USER_EMAIL,
        "password": testData.DEFAULT_USER_PASSWORD,
        "verificationCode": "1111"
      };

      const expectedResult = {
        "data": {
          "verifyUser": {
            "__typename": "UserVerificationResultSuccess",
            "user": {
              "isActive": true,
              "name": testData.DEFAULT_USER_NAME,
              "email": testData.DEFAULT_USER_EMAIL,
              "isUserVerified": true
            }
          }
        }
      };

      const result = await api.request(authQuery.VERIFY_USER_QUERY, variables, null);
      expect(result.data).to.eql(expectedResult);
    });

    it('checks that the default access role BUYER was created', async function () {
      const user = await MUser.findOne({ where: { email: testData.DEFAULT_USER_EMAIL } });
      const userRole = await MUserRole.findOne({ where: { C_User_ID: user.C_User_ID } });
      expect(userRole.roleName).to.eql("BUY");
    });

    it('returns a UserVerificationResultError when verification code is already verified', async function () {
      const variables = {
        "email": testData.DEFAULT_USER_EMAIL,
        "password": testData.DEFAULT_USER_PASSWORD,
        "verificationCode": "1111"
      };

      const expectedResult = {
        "data": {
          "verifyUser": {
            "__typename": "UserVerificationResultError",
            "message": "User is already verified"
          }
        }
      };

      const result = await api.request(authQuery.VERIFY_USER_QUERY, variables, null);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Login', function () {
    it('returns a LoginResultError when is a invalid email/password', async function () {
      const variables = {
        "email": testData.DEFAULT_USER_EMAIL,
        "password": "wrongPassword",
        "fcmToken": testData.DEFAULT_USER_FCM_TOKEN
      };

      const expectedResult = {
        "data": {
          "login": {
            "__typename": "LoginResultError",
            "message": "Invalid email/password"
          }
        }
      };

      const result = await api.request(authQuery.LOGIN_QUERY, variables, null);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a LoginResultSuccess when login was successful', async function () {
      const variables = {
        "email": testData.DEFAULT_USER_EMAIL,
        "password": testData.DEFAULT_USER_PASSWORD,
        "fcmToken": testData.DEFAULT_USER_FCM_TOKEN
      };

      const expectedResult = {
        "data": {
          "login": {
            "__typename": "LoginResultSuccess",
            "user": {
              "isActive": true,
              "name": testData.DEFAULT_USER_NAME,
              "email": testData.DEFAULT_USER_EMAIL,
              "userRoles": [
                {
                  "isActive": true,
                  "roleName": "BUY"
                }
              ]
            }
          }
        }
      };

      const result = await api.request(authQuery.LOGIN_QUERY, variables, null);
      expect(result.data).to.eql(expectedResult);
    });
  });
});
