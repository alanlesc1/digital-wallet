import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const eventQueries = {
  events: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const events = await db.MEvent.findAll({
          where: {
            ...args.filter,
          },
        });

        const result = {
          __typename: "Events",
          events: events.map(element => {
            return {
              __typename: "Event",
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

export default eventQueries;
