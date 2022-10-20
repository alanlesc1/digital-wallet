const userWalletFields = {
  UserWallet: {
    user: async (userWallet, _, { db }) => {
      const user = await db.MUser.findOne({ where: { C_User_ID: userWallet.C_User_ID } });
      return (user ? user.toJSON() : null);
    },
    billingLocation: async (userWallet, _, { db }) => {
      const location = await db.MLocation.findOne({ where: { C_Location_ID: userWallet.billing_Location_ID } });
      return (location ? location.toJSON() : null);
    }
  }
};

export default userWalletFields;
