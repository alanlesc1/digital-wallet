import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const productCategoryQueries = {
  productCategories: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const productCategories = await db.MProductCategory.findAll({
          where: {
            ...args.filter,
          },
        });

        const result = {
          __typename: "ProductCategories",
          productCategories: productCategories.map(element => {
            return {
              __typename: "ProductCategory",
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

export default productCategoryQueries;
