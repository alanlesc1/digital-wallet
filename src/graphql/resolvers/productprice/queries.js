import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const productPriceQueries = {
  productPrices: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const productPrices = await db.MProductPrice.findAll({
          where: {
            ...args.filter,
          },
        });

        const result = {
          __typename: "ProductPrices",
          productPrices: productPrices.map(element => {
            return {
              __typename: "ProductPrice",
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

export default productPriceQueries;
