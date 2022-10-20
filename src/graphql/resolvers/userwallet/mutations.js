import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const userWalletMutations = {
  createUserWallet: combineResolvers(
    isAuthenticated,
    async (_, args, { authUser, db, results }) => {
      try {
        // TODO: Create card in Pagar.me API

        // Create a new one based on Pagar.me response
        const userWallet = await db.MUserWallet.create({
          ...args
        });

        return {
          __typename: "UserWallet",
          ...userWallet
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    }
  )
};

export default userWalletMutations;
