import { nodeEnv } from '../../../config/environment';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';
import { ValidationError } from 'sequelize';

const userWalletMutations = {
  createUserWallet: combineResolvers(
    isAuthenticated,
    async (_, args, { authUser, db, paymentGateway, results }) => {
      try {
        // TODO: Create db trx
        // Create billing location
        const location = await db.MLocation.create({
          ...args.input.billingLocation,
        });

        // Create user wallet
        const userWallet = await db.MUserWallet.create({
          C_User_ID: authUser.C_User_ID,
          name: args.input.name,
          paymentMethod: args.input.paymentMethod,
          cardHolderName: args.input.cardHolderName,
          cardExpMonth: args.input.cardExpMonth,
          cardExpYear: args.input.cardExpYear,
          cardHolderDocumentType: args.input.cardHolderDocumentType,
          cardHolderDocumentNo: args.input.cardHolderDocumentNo,
          billing_Location_ID: location.C_Location_ID,
        });

        const response = await paymentGateway.createCard(
          userWallet,
          {
            card_number: args.input.cardNumber,
            card_expiration_date: args.input.cardExpMonth + '' + args.input.cardExpYear,
            card_holder_name: args.input.cardHolderName,
            card_cvv: args.input.cardCVV,
          }
        );

        if (nodeEnv.production && !response.isValid) {
          return results.create(results.InvalidCardError);
        }

        userWallet.set({
          ...response,
        });

        await userWallet.save();

        return {
          __typename: "UserWallet",
          ...userWallet.toJSON()
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return results.create(results.UserWalletResultError, error.errors[0].message);
        else {
          console.error(error);
          return results.create(results.UserWalletResultError);
        }
      }
    }
  )
};

export default userWalletMutations;
