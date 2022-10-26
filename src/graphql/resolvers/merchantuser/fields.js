const merchantUserFields = {
  MerchantUser: {
    merchant: async (merchantUser, _, { db }) => {
      const merchant = await db.MMerchant.findOne({
        where: {
          C_Merchant_ID: merchantUser.C_Merchant_ID,
        },
      });

      const result = {
        __typename: "Merchant",
        ...merchant.toJSON()
      };

      return result;
    },

    user: async (merchantUser, _, { db }) => {
      const user = await db.MUser.findOne({
        where: {
          C_User_ID: merchantUser.C_User_ID,
        },
      });

      const result = {
        __typename: "User",
        ...user.toJSON()
      };

      return result;
    },

  }
};

export default merchantUserFields;
