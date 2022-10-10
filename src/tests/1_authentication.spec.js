import { expect } from 'chai';
import * as api from './authenticationApi';
import { sequelize, MUser, MUserRole } from '../db/models';

describe('Authentication', () => {
  before(async () => {
    await sequelize
    .sync({ force: true })
    .then(async () => {
      // seed
    });
  })

  describe('SignUp', () => {
    it('returns a SignUpResultSuccess when user can be created', async () => {
      const variables = {
        "name": "Test User",
        "email": "test@easytrackpay.com",
        "password": "123456"
      };

      const expectedResult = {
        "data": {
          "signUp": {
            "__typename": "SignUpResultSuccess",
            "user": {
              "isActive": true,
              "name": "Test User",
              "email": "test@easytrackpay.com",
              "isUserVerified": false
            }
          }
        }
      };

      const result = await api.signUp(variables);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a SignUpResultError when user already exists', async () => {
      const variables = {
        "name": "Test User",
        "email": "test@easytrackpay.com",
        "password": "123456"
      };

      const expectedResult = {
        "data": {
          "signUp": {
            "__typename": "SignUpResultError",
            "message": "email must be unique"
          }
        }
      };

      const result = await api.signUp(variables);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Generate verification code', () => {
    it('returns a UserVerificationResultError when is a invalid email/password', async () => {
      const variables = {
        "email": "test@easytrackpay.com",
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

      const result = await api.generateVerificationCode(variables);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a UserVerificationResultSuccess when verification code was generated', async () => {
      const variables = {
        "email": "test@easytrackpay.com",
        "password": "123456"
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

      const result = await api.generateVerificationCode(variables);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Verify verification code', () => {
    it('returns a UserVerificationResultError when verification code is invalid', async () => {
      await sequelize.query('UPDATE C_User SET VerificationCode = ? WHERE Email = ?',
        {
          replacements: ['1111', 'test@easytrackpay.com']
        });

      const variables = {
        "email": "test@easytrackpay.com",
        "password": "123456",
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

      const result = await api.verifyUser(variables);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a UserVerificationResultError when verification code is expired', async () => {
      await sequelize.query("UPDATE C_User SET VerificationCodeExp = NOW() - INTERVAL '1 DAY' WHERE Email = ?",
        {
          replacements: ['test@easytrackpay.com']
        });

      const variables = {
        "email": "test@easytrackpay.com",
        "password": "123456",
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

      const result = await api.verifyUser(variables);
      expect(result.data).to.eql(expectedResult);

      await sequelize.query("UPDATE C_User SET VerificationCodeExp = NOW() + INTERVAL '1 DAY' WHERE Email = ?",
        {
          replacements: ['test@easytrackpay.com']
        });
    });

    it('returns a UserVerificationResultSuccess when verification code is valid', async () => {
      const variables = {
        "email": "test@easytrackpay.com",
        "password": "123456",
        "verificationCode": "1111"
      };

      const expectedResult = {
        "data": {
          "verifyUser": {
            "__typename": "UserVerificationResultSuccess",
            "user": {
              "isActive": true,
              "name": "Test User",
              "email": "test@easytrackpay.com",
              "isUserVerified": true
            }
          }
        }
      };

      const result = await api.verifyUser(variables);
      expect(result.data).to.eql(expectedResult);
    });

    it('checks that the default access role BUYER was created', async () => {
      const user = await MUser.findOne({ where: { email: "test@easytrackpay.com" } });
      const userRole = await MUserRole.findOne({ where: { C_User_ID: user.C_User_ID } });
      expect(userRole.role).to.eql("BUY");
    });

    it('returns a UserVerificationResultError when verification code is already verified', async () => {
      const variables = {
        "email": "test@easytrackpay.com",
        "password": "123456",
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

      const result = await api.verifyUser(variables);
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('Login', () => {
    it('returns a LoginResultError when is a invalid email/password', async () => {
      const variables = {
        "email": "test@easytrackpay.com",
        "password": "wrongPassword"
      };

      const expectedResult = {
        "data": {
          "login": {
            "__typename": "LoginResultError",
            "message": "Invalid email/password"
          }
        }
      };

      const result = await api.login(variables);
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a LoginResultSuccess when login was successful', async () => {
      const variables = {
        "email": "test@easytrackpay.com",
        "password": "123456"
      };

      const expectedResult = {
        "data": {
          "login": {
            "__typename": "LoginResultSuccess",
            "user": {
              "isActive": true,
              "name": "Test User",
              "email": "test@easytrackpay.com",
              "userRoles": [
                {
                  "isActive": true,
                  "role": "BUY"
                }
              ]
            }
          }
        }
      };

      const result = await api.login(variables);
      expect(result.data).to.eql(expectedResult);
    });
  });
});