import { nodeEnv } from '../../../config/environment';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';
import { ValidationError } from 'sequelize';

const merchantMutations = {
  createMerchant: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const merchant = await db.MMerchant.create({
          ...args.input,
        });

        return {
          __typename: "Merchant",
          ...merchant.toJSON()
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return results.create(results.MerchantResultError, error.errors[0].message);
        else {
          console.error(error);
          return results.create(results.MerchantResultError);
        }
      }
    }
  )
};

export default merchantMutations;
