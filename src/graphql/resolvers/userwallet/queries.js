import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const userWalletQueries = {
  userWallet: combineResolvers(
    isAuthenticated,
    async (_, { C_UserWallet_ID }, { authUser, db, results }) => {
      try {
        const userWallet = await db.MUserWallet.findByPk(C_UserWallet_ID);

        if (!userWallet) {
          return results.create(results.UserWalletNotFoundError);
        }

        return {
          __typename: "UserWallet",
          ...userWallet.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),

  userWallets: combineResolvers(
    isAuthenticated,
    async (_, { C_User_ID }, { authUser, db, results }) => {
      try {
        const wallets = await db.MUserWallet.findAll({
          where: {
            C_User_ID: C_User_ID,
          },
        });

        const result = {
          __typename: "UserWallets",
          userWallets: wallets.map(element => {
            return {
              __typename: "UserWallet",
              ...element.toJSON()
            }
          })
        };

        return result;
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    }
  )
};

export default userWalletQueries;
