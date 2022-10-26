import { nodeEnv } from '../../../config/environment';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';
import { ValidationError } from 'sequelize';

const merchantUserMutations = {
  createMerchantUser: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const merchantUser = await db.MMerchantUser.create({
          ...args.input,
        });

        return {
          __typename: "MerchantUser",
          ...merchantUser.toJSON()
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return results.create(results.MerchantUserResultError, error.errors[0].message);
        else {
          console.error(error);
          return results.create(results.MerchantUserResultError);
        }
      }
    }
  )
};

export default merchantUserMutations;
