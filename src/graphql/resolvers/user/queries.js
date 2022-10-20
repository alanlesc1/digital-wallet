import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const userQueries = {
  me: combineResolvers(
    isAuthenticated,
    async (_, args, { authUser, db, results }) => {
      try {
        const userModel = await db.MUser.findByPk(authUser.C_User_ID);

        return {
          __typename: "User",
          ...userModel.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    }
  )
}

export default userQueries;
