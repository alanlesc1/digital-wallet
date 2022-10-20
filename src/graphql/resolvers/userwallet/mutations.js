const userWalletMutations = {
  createUserWallet: async (_, args, { authUser, db, results }) => {
    if (authUser) {
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
    } else {
      return results.create(results.NotAuthenticatedError);
    }
  }
};

export default userWalletMutations;
