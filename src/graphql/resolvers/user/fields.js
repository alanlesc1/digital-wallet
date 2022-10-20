const userFields = {
  User: {
    userRoles: async (user, _, { db }) => {
      const userRoles = await db.MUserRole.findAll({
        where: {
          C_User_ID: user.C_User_ID,
        },
      });

      const result = userRoles.map(element => {
        return {
          __typename: "UserRole",
          ...element.toJSON()
        }
      });

      return result;
    },

    userWallets: async (user, _, { db }) => {
      const userWallets = await db.MUserWallet.findAll({
        where: {
          C_User_ID: user.C_User_ID,
        },
      });

      const result = userWallets.map(element => {
        return {
          __typename: "UserWallet",
          ...element.toJSON()
        }
      });

      return result;
    }
  }
};

export default userFields;
