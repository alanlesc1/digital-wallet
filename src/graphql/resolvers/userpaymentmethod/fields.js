const userPaymentMethodFields = {
  UserPaymentMethod: {
    user: async (userPaymentMethod, _, { db }) => {
      const user = await db.MUser.findByPk(userPaymentMethod.C_User_ID);
      return (user ? user.toJSON() : null);
    },
    
    billingLocation: async (userPaymentMethod, _, { db }) => {
      const location = await db.MLocation.findByPk(userPaymentMethod.billing_Location_ID);
      return (location ? location.toJSON() : null);
    }
  }
};

export default userPaymentMethodFields;
