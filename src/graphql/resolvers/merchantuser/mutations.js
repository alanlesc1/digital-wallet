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
  ),

  updateMerchantUser: combineResolvers(
    isAuthenticated,
    async (_, { C_MerchantUser_ID, input }, { db, results }) => {
      try {
        await db.MMerchantUser.update({ ...input }, {
          where: {
            C_MerchantUser_ID
          }
        });

        const merchantUser = await db.MMerchantUser.findByPk(C_MerchantUser_ID);

        return {
          __typename: "MerchantUser",
          ...merchantUser.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),
};

export default merchantUserMutations;
