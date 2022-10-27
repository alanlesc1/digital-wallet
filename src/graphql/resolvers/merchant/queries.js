import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const merchantQueries = {
  merchants: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const merchants = await db.MMerchant.findAll({
          where: {
            ...args.filter,
          },
        });

        const result = {
          __typename: "Merchants",
          merchants: merchants.map(element => {
            return {
              __typename: "Merchant",
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

export default merchantQueries;
