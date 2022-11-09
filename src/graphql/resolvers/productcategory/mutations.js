import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';
import { ValidationError } from 'sequelize';

const productCategoryMutations = {
  createProductCategory: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const productCategory = await db.MProductCategory.create({
          ...args.input,
        });

        return {
          __typename: "ProductCategory",
          ...productCategory.toJSON()
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return results.create(results.ProductCategoryResultError, error.errors[0].message);
        else {
          console.error(error);
          return results.create(results.ProductCategoryResultError);
        }
      }
    }
  ),

  updateProductCategory: combineResolvers(
    isAuthenticated,
    async (_, { M_ProductCategory_ID, input }, { db, results }) => {
      try {
        await db.MProductCategory.update({ ...input }, {
          where: {
            M_ProductCategory_ID
          }
        });

        const productCategory = await db.MProductCategory.findByPk(M_ProductCategory_ID);

        return {
          __typename: "ProductCategory",
          ...productCategory.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),
};

export default productCategoryMutations;
