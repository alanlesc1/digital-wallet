import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret } from '../../../../src/config/environment';
import { generateNewVerification, verifyCode } from '../../../helpers/userVerification';
import { ValidationError } from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const passwordSaltRounds = 10;

const userMutations = {
  signup: async (_, { name, email, password }, { db, results }) => {
    try {
      const user = await db.MUser.create({
        name,
        email,
        password: await bcrypt.hash(password, passwordSaltRounds),
      });

      return results.create(results.SignupResultSuccess, user);
    } catch (error) {
      if (error instanceof ValidationError)
        return results.create(results.SignupResultError, error.errors[0].message);
      else {
        console.error(error);
        return results.create(results.SignupResultError);
      }
    }
  },
  verifyUser: async (_, { email, password, verificationCode }, { db, results }) => {
    try {
      const user = await db.MUser.findOne({ where: { email } });

      if (user) {
        const valid = await bcrypt.compare(password, user.password);

        if (valid) {
          if (user.isUserVerified) {
            return results.create(results.UserVerificationResultError, results.messages.userIsAlreadyVerifiedMessage);
          }

          if (!user.verificationCode && verificationCode) {
            return results.create(results.UserVerificationResultError, results.messages.verificationCodeWasGeneratedMessage);
          }

          // Check for previously generated verification code
          if (verificationCode) {
            try {
              const isVerified = await verifyCode(user, verificationCode);

              if (isVerified) {
                // Create a default access role
                await db.MUserRole.create({
                  C_User_ID: user.C_User_ID,
                  roleName: 'BUY',
                });
              }
            } catch (error) {
              if (error.__typename == "UserVerificationResultError") {
                return error;
              } else {
                console.error(error);
                return results.create(results.UserVerificationResultError);
              }
            }
          }
          // Generate a new verification code
          else {
            await generateNewVerification(user);
          }

          await user.reload();

          return results.create(results.UserVerificationResultSuccess, user);
        }
      }
    } catch (error) {
      if (error instanceof ValidationError)
        return results.create(results.UserVerificationResultError, error.errors[0].message);
      else {
        console.error(error);
        return results.create(results.UserVerificationResultError);
      }
    }

    return results.create(results.UserVerificationResultError, results.messages.invalidEmailPasswordMessage);
  },
  login: async (_, { email, password, fcmToken }, { db, results }) => {
    try {
      const user = await db.MUser.findOne({
        where: { email }
      });

      if (user) {
        const valid = await bcrypt.compare(password, user.password);

        if (valid) {
          if (!user.isUserVerified) {
            return results.create(results.LoginResultError, results.messages.notAVerifiedUserMessage);
          }

          // Firebase FCM
          let token;

          {
            token = await db.MUserFcmToken.findOne({
              where: { token: fcmToken }
            });

            // if not found, create a new one
            if (!token) {
              token = await db.MUserFcmToken.create({
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

          const userRoles = await db.MUserRole.findAll({
            where: {
              ...user.C_User_ID,
            },
            attributes: ['roleName'],
          });

          const jwtPayload = {
            C_User_ID: user.C_User_ID,
            email: user.email,
            userRoles: userRoles.map(element => element.toJSON().roleName),
            fcmToken: token.token
          };

          const authToken = jsonwebtoken.sign(
            jwtPayload,
            jwtSecret, {
            expiresIn: "1d",
          });

          return results.create(results.LoginResultSuccess, { token: authToken, user: user });
        }
      }

      return results.create(results.LoginResultError, results.messages.invalidEmailPasswordMessage);
    } catch (error) {
      if (error instanceof ValidationError)
        return results.create(results.LoginResultError, error.errors[0].message);
      else {
        console.error(error);
        return results.create(results.LoginResultError);
      }
    }
  },
  updateUser: combineResolvers(
    isAuthenticated,
    async (_, { C_User_ID, input }, { db, results }) => {
      try {
        await db.MUser.update({ ...input }, {
          where: {
            C_User_ID
          }
        });

        const user = await db.MUser.findByPk(C_User_ID);

        return {
          __typename: "User",
          ...user.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),
};

export default userMutations;
