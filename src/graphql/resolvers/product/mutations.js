import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';
import { ValidationError } from 'sequelize';

const productMutations = {
  createProduct: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const product = await db.MProduct.create({
          ...args.input,
        });

        return {
          __typename: "Product",
          ...product.toJSON()
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return results.create(results.ProductResultError, error.errors[0].message);
        else {
          console.error(error);
          return results.create(results.ProductResultError);
        }
      }
    }
  ),

  updateProduct: combineResolvers(
    isAuthenticated,
    async (_, { M_Product_ID, input }, { db, results }) => {
      try {
        await db.MProduct.update({ ...input }, {
          where: {
            M_Product_ID
          }
        });

        const product = await db.MProduct.findByPk(M_Product_ID);

        return {
          __typename: "Product",
          ...product.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),
};

export default productMutations;
