const userWalletFields = {
  UserWallet: {
    user: async (userWallet, _, { db }) => {
      const user = await db.MUser.findByPk(userWallet.C_User_ID);
      return (user ? user.toJSON() : null);
    },
    billingLocation: async (userWallet, _, { db }) => {
      const location = await db.MLocation.findByPk(userWallet.billing_Location_ID);
      return (location ? location.toJSON() : null);
    }
  }
};

export default userWalletFields;
