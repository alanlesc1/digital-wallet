import { MUser, MUserRole, MUserFcmToken } from '../../../db/models';
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret } from '../../../../src/config/environment';
import { generateNewVerification, verifyCode } from '../../../helpers/userVerification';
import {
  ResultsFactory,
  SignUpResultSuccess,
  SignUpResultError,
  UserVerificationResultSuccess,
  UserVerificationResultError,
  LoginResultSuccess,
  LoginResultError,
  invalidEmailPasswordMessage,
  userIsAlreadyVerifiedMessage,
  verificationCodeWasGeneratedMessage,
  notAVerifiedUserMessage
} from '../../helpers/resultsFactory';
import { ValidationError } from 'sequelize';

const userMutations = {
  signUp: async (_, { name, email, password }) => {
    try {
      const user = await MUser.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });

      return ResultsFactory.create({ type: SignUpResultSuccess, user: user });
    } catch (error) {
      if (error instanceof ValidationError)
        return ResultsFactory.create({ type: SignUpResultError, message: error.errors[0].message });
      else {
        console.error(error);
        return ResultsFactory.create({ type: SignUpResultError });
      }
    }
  },
  verifyUser: async (_, { email, password, verificationCode }) => {
    try {
      const user = await MUser.findOne({ where: { email } });

      if (user) {
        const valid = await bcrypt.compare(password, user.password);

        if (valid) {
          if (user.isUserVerified) {
            return ResultsFactory.create({ type: UserVerificationResultError, message: userIsAlreadyVerifiedMessage });
          }

          if (!user.verificationCode && verificationCode) {
            return ResultsFactory.create({ type: UserVerificationResultError, message: verificationCodeWasGeneratedMessage });
          }

          // Check for previously generated verification code
          if (verificationCode) {
            try {
              const isVerified = await verifyCode(user, verificationCode);

              if (isVerified) {
                // Create a default access role
                await MUserRole.create({
                  C_User_ID: user.C_User_ID,
                  roleName: 'BUY',
                });
              }
            } catch (error) {
              if (error.__typename == "UserVerificationResultError") {
                return error;
              } else {
                console.error(error);
                return ResultsFactory.create({ type: UserVerificationResultError });
              }
            }
          }
          // Generate a new verification code
          else {
            await generateNewVerification(user);
          }

          await user.reload({
            include: {
              model: MUserRole,
              as: 'userRoles'
            }
          });

          return ResultsFactory.create({ type: UserVerificationResultSuccess, user: user });
        }
      }
    } catch (error) {
      if (error instanceof ValidationError)
        return ResultsFactory.create({ type: UserVerificationResultError, message: error.errors[0].message });
      else {
        console.error(error);
        return ResultsFactory.create({ type: UserVerificationResultError });
      }
    }

    return ResultsFactory.create({ type: UserVerificationResultError, message: invalidEmailPasswordMessage });
  },
  login: async (_, { email, password, fcmToken }) => {
    try {
      const user = await MUser.findOne({
        where: { email },
        include: {
          model: MUserRole,
          as: 'userRoles'
        }
      });

      if (user) {
        const valid = await bcrypt.compare(password, user.password);

        if (valid) {
          if (!user.isUserVerified) {
            return ResultsFactory.create({ type: LoginResultError, message: notAVerifiedUserMessage });
          }

          // Firebase FCM
          let token;
            
          {
            token = await MUserFcmToken.findOne({
              where: { token: fcmToken }
            });

            // if not found, create a new one
            if (!token) {
              token = await MUserFcmToken.create({
                token: fcmToken,
                C_User_ID: user.C_User_ID,
                lastSeen: user.sequelize.literal("current_timestamp")
              });
            }
            // otherwise, just keep updated
            else {
              token.set({
                C_User_ID: user.C_User_ID,
                lastSeen: user.sequelize.literal("current_timestamp")
              });

              await token.save();
            }
          }

          const authToken = jsonwebtoken.sign(
            { C_User_ID: user.C_User_ID, email: user.email, fcmToken: token.token },
            jwtSecret, {
            expiresIn: "1d",
          });

          return ResultsFactory.create({ type: LoginResultSuccess, token: authToken, user: user });
        }
      }

      return ResultsFactory.create({ type: LoginResultError, message: invalidEmailPasswordMessage });
    } catch (error) {
      if (error instanceof ValidationError)
        return ResultsFactory.create({ type: LoginResultError, message: error.errors[0].message });
      else {
        console.error(error);
        return ResultsFactory.create({ type: LoginResultError });
      }
    }
  },
};

export default userMutations;
