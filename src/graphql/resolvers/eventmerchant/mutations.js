import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';
import { ValidationError } from 'sequelize';

const eventMerchantMutations = {
  createEventMerchant: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const eventMerchant = await db.MEventMerchant.create({
          ...args.input,
        });

        return {
          __typename: "EventMerchant",
          ...eventMerchant.toJSON()
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return results.create(results.EventMerchantResultError, error.errors[0].message);
        else {
          console.error(error);
          return results.create(results.EventMerchantResultError);
        }
      }
    }
  ),

  updateEventMerchant: combineResolvers(
    isAuthenticated,
    async (_, { C_EventMerchant_ID, input }, { db, results }) => {
      try {
        await db.MEventMerchant.update({ ...input }, {
          where: {
            C_EventMerchant_ID
          }
        });

        const eventMerchant = await db.MEventMerchant.findByPk(C_EventMerchant_ID);

        return {
          __typename: "EventMerchant",
          ...eventMerchant.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),
};

export default eventMerchantMutations;
