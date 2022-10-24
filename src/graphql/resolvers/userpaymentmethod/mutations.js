import { nodeEnv } from '../../../config/environment';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';
import { ValidationError } from 'sequelize';

const userPaymentMethodMutations = {
  createUserPaymentMethod: combineResolvers(
    isAuthenticated,
    async (_, args, { authUser, db, paymentGateway, results }) => {
      try {
        // TODO: Create db trx
        // Create billing location
        const location = await db.MLocation.create({
          ...args.input.billingLocation,
        });

        // Create user payment method
        const userPaymentMethod = await db.MUserPaymentMethod.create({
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
          userPaymentMethod,
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

        userPaymentMethod.set({
          ...response,
        });

        await userPaymentMethod.save();

        return {
          __typename: "UserPaymentMethod",
          ...userPaymentMethod.toJSON()
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return results.create(results.UserPaymentMethodResultError, error.errors[0].message);
        else {
          console.error(error);
          return results.create(results.UserPaymentMethodResultError);
        }
      }
    }
  )
};

export default userPaymentMethodMutations;
