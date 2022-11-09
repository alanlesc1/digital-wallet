import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';
import { ValidationError } from 'sequelize';

const priceListMutations = {
  createPriceList: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const priceList = await db.MPriceList.create({
          ...args.input,
        });

        return {
          __typename: "PriceList",
          ...priceList.toJSON()
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return results.create(results.PriceListResultError, error.errors[0].message);
        else {
          console.error(error);
          return results.create(results.PriceListResultError);
        }
      }
    }
  ),

  updatePriceList: combineResolvers(
    isAuthenticated,
    async (_, { M_PriceList_ID, input }, { db, results }) => {
      try {
        await db.MPriceList.update({ ...input }, {
          where: {
            M_PriceList_ID
          }
        });

        const priceList = await db.MPriceList.findByPk(M_PriceList_ID);

        return {
          __typename: "PriceList",
          ...priceList.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),
};

export default priceListMutations;
