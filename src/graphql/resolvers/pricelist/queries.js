import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const priceListQueries = {
  priceLists: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const priceLists = await db.MPriceList.findAll({
          where: {
            ...args.filter,
          },
        });

        const result = {
          __typename: "PriceLists",
          priceLists: priceLists.map(element => {
            return {
              __typename: "PriceList",
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

export default priceListQueries;
