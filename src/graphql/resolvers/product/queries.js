import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const productQueries = {
  products: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const products = await db.MProduct.findAll({
          where: {
            ...args.filter,
          },
        });

        const result = {
          __typename: "Products",
          products: products.map(element => {
            return {
              __typename: "Product",
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

export default productQueries;
