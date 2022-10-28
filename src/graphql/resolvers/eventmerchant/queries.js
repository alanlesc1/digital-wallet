import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const eventMerchantQueries = {
  eventMerchants: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const eventMerchants = await db.MEventMerchant.findAll({
          where: {
            ...args.filter,
          },
        });

        const result = {
          __typename: "EventMerchants",
          eventMerchants: eventMerchants.map(element => {
            return {
              __typename: "EventMerchant",
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

export default eventMerchantQueries;
