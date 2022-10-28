import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';
import { ValidationError } from 'sequelize';

const eventMutations = {
  createEvent: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const event = await db.MEvent.create({
          ...args.input,
        });

        return {
          __typename: "Event",
          ...event.toJSON()
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return results.create(results.EventResultError, error.errors[0].message);
        else {
          console.error(error);
          return results.create(results.EventResultError);
        }
      }
    }
  ),

  updateEvent: combineResolvers(
    isAuthenticated,
    async (_, { C_Event_ID, input }, { db, results }) => {
      try {
        await db.MEvent.update({ ...input }, {
          where: {
            C_Event_ID
          }
        });

        const event = await db.MEvent.findByPk(C_Event_ID);

        return {
          __typename: "Event",
          ...event.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),
};

export default eventMutations;
