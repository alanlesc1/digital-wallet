import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const merchantUserQueries = {
  merchantUsers: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const merchantUsers = await db.MMerchantUser.findAll({
          where: {
            ...args.filter,
          },
        });

        const result = {
          __typename: "MerchantUsers",
          merchantUsers: merchantUsers.map(element => {
            return {
              __typename: "MerchantUser",
              ...element.toJSON()
            }
          })
        };

        return result;
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),
};

export default merchantUserQueries;
