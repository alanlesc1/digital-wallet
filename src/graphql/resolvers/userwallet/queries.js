const userWalletQueries = {
  userWallet: async (_, { C_UserWallet_ID }, { authUser, db, results }) => {
    if (authUser) {
      try {
        const userWallet = await db.MUserWallet.findOne({
          where: {
            C_UserWallet_ID: C_UserWallet_ID,
          }
        });

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
    } else {
      return results.create(results.NotAuthenticatedError);
    }
  },

  userWallets: async (_, { C_User_ID }, { authUser, db, results }) => {
    if (authUser) {
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
    } else {
      return results.create(results.NotAuthenticatedError);
    }
  }
};

export default userWalletQueries;
