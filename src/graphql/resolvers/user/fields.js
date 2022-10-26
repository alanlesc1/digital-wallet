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

    userPaymentMethods: async (user, _, { db }) => {
      const userPaymentMethods = await db.MUserPaymentMethod.findAll({
        where: {
          C_User_ID: user.C_User_ID,
        },
      });

      const result = userPaymentMethods.map(element => {
        return {
          __typename: "UserPaymentMethod",
          ...element.toJSON()
        }
      });

      return result;
    },

    merchantUsers: async (user, _, { db }) => {
      const merchantUsers = await db.MMerchantUser.findAll({
        where: {
          C_User_ID: user.C_User_ID,
        },
      });

      const result = merchantUsers.map(element => {
        return {
          __typename: "MerchantUser",
          ...element.toJSON()
        }
      });

      return result;
    },
  }
};

export default userFields;
