import { expect } from 'chai';
import * as authApi from './authenticationApi';
import { sequelize, MUser, MUserRole } from '../db/models';

describe('Authentication', () => {
  describe('Signup', () => {
    it('returns a SignupResultSuccess when user can be created', async () => {
      const variables = {
        "name": authApi.DEFAULT_USER_NAME,
        "email": authApi.DEFAULT_USER_EMAIL,
        "password": authApi.DEFAULT_USER_PASSWORD
      };

      const expectedResult = {
        "data": {
          "signup": {
            "__typename": "SignupResultSuccess",
            "user": {
              "isActive": true,
              "name": authApi.DEFAULT_USER_NAME,
              "email": authApi.DEFAULT_USER_EMAIL,
              "isUserVerified": false
            }
          }
        }
      };

      const result = await authApi.signup(variables);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a SignupResultError when user already exists', async () => {
      const variables = {
        "name": authApi.DEFAULT_USER_NAME,
        "email": authApi.DEFAULT_USER_EMAIL,
        "password": authApi.DEFAULT_USER_PASSWORD
      };

      const expectedResult = {
        "data": {
          "signup": {
            "__typename": "SignupResultError",
            "message": "email must be unique"
          }
        }
      };

      const result = await authApi.signup(variables);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Generate verification code', () => {
    it('returns a UserVerificationResultError when is a invalid email/password', async () => {
      const variables = {
        "email": authApi.DEFAULT_USER_EMAIL,
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

      const result = await authApi.generateVerificationCode(variables);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a UserVerificationResultSuccess when verification code was generated', async () => {
      const variables = {
        "email": authApi.DEFAULT_USER_EMAIL,
        "password": authApi.DEFAULT_USER_PASSWORD
      };

      const expectedResult = {
        "data": {
          "verifyUser": {
            "__typename": "UserVerificationResultSuccess",
            "user": {
              "isActive": true,
              "name": "Test User",
              "email": "test@easytrackpay.com",
              "isUserVerified": false
            }
          }
        }
      };

      const result = await authApi.generateVerificationCode(variables);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Verify verification code', () => {
    it('returns a UserVerificationResultError when verification code is invalid', async () => {
      await sequelize.query('UPDATE C_User SET VerificationCode = ? WHERE Email = ?',
        {
          replacements: ["1111", authApi.DEFAULT_USER_EMAIL]
        });

      const variables = {
        "email": authApi.DEFAULT_USER_EMAIL,
        "password": authApi.DEFAULT_USER_PASSWORD,
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

      const result = await authApi.verifyUser(variables);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a UserVerificationResultError when verification code is expired', async () => {
      await sequelize.query("UPDATE C_User SET VerificationCodeExp = NOW() - INTERVAL '1 DAY' WHERE Email = ?",
        {
          replacements: [authApi.DEFAULT_USER_EMAIL]
        });

      const variables = {
        "email": authApi.DEFAULT_USER_EMAIL,
        "password": authApi.DEFAULT_USER_PASSWORD,
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

      const result = await authApi.verifyUser(variables);
      expect(result.data).to.eql(expectedResult);

      await sequelize.query("UPDATE C_User SET VerificationCodeExp = NOW() + INTERVAL '1 DAY' WHERE Email = ?",
        {
          replacements: [authApi.DEFAULT_USER_EMAIL]
        });
    });

    it('returns a UserVerificationResultSuccess when verification code is valid', async () => {
      const variables = {
        "email": authApi.DEFAULT_USER_EMAIL,
        "password": authApi.DEFAULT_USER_PASSWORD,
        "verificationCode": "1111"
      };

      const expectedResult = {
        "data": {
          "verifyUser": {
            "__typename": "UserVerificationResultSuccess",
            "user": {
              "isActive": true,
              "name": authApi.DEFAULT_USER_NAME,
              "email": authApi.DEFAULT_USER_EMAIL,
              "isUserVerified": true
            }
          }
        }
      };

      const result = await authApi.verifyUser(variables);
      expect(result.data).to.eql(expectedResult);
    });

    it('checks that the default access role BUYER was created', async () => {
      const user = await MUser.findOne({ where: { email: authApi.DEFAULT_USER_EMAIL } });
      const userRole = await MUserRole.findOne({ where: { C_User_ID: user.C_User_ID } });
      expect(userRole.roleName).to.eql("BUY");
    });

    it('returns a UserVerificationResultError when verification code is already verified', async () => {
      const variables = {
        "email": authApi.DEFAULT_USER_EMAIL,
        "password": authApi.DEFAULT_USER_PASSWORD,
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

      const result = await authApi.verifyUser(variables);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Login', () => {
    it('returns a LoginResultError when is a invalid email/password', async () => {
      const variables = {
        "email": authApi.DEFAULT_USER_EMAIL,
        "password": "wrongPassword",
        "fcmToken": authApi.DEFAULT_USER_FCM_TOKEN
      };

      const expectedResult = {
        "data": {
          "login": {
            "__typename": "LoginResultError",
            "message": "Invalid email/password"
          }
        }
      };

      const result = await authApi.login(variables);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a LoginResultSuccess when login was successful', async () => {
      const variables = {
        "email": authApi.DEFAULT_USER_EMAIL,
        "password": authApi.DEFAULT_USER_PASSWORD,
        "fcmToken": authApi.DEFAULT_USER_FCM_TOKEN
      };

      const expectedResult = {
        "data": {
          "login": {
            "__typename": "LoginResultSuccess",
            "user": {
              "isActive": true,
              "name": authApi.DEFAULT_USER_NAME,
              "email": authApi.DEFAULT_USER_EMAIL,
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

      const result = await authApi.login(variables);
      expect(result.data).to.eql(expectedResult);
    });
  });
});