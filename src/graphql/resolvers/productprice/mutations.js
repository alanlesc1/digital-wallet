import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';
import { ValidationError } from 'sequelize';

const productPriceMutations = {
  createProductPrice: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const productPrice = await db.MProductPrice.create({
          ...args.input,
        });

        return {
          __typename: "ProductPrice",
          ...productPrice.toJSON()
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return results.create(results.ProductPriceResultError, error.errors[0].message);
        else {
          console.error(error);
          return results.create(results.ProductPriceResultError);
        }
      }
    }
  ),

  updateProductPrice: combineResolvers(
    isAuthenticated,
    async (_, { M_ProductPrice_ID, input }, { db, results }) => {
      try {
        await db.MProductPrice.update({ ...input }, {
          where: {
            M_ProductPrice_ID
          }
        });

        const productPrice = await db.MProductPrice.findByPk(M_ProductPrice_ID);

        return {
          __typename: "ProductPrice",
          ...productPrice.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),
};

export default productPriceMutations;
