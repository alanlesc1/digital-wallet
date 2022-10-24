import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const userPaymentMethodQueries = {
  userPaymentMethod: combineResolvers(
    isAuthenticated,
    async (_, { C_UserPaymentMethod_ID }, { authUser, db, results }) => {
      try {
        const userPaymentMethod = await db.MUserPaymentMethod.findByPk(C_UserPaymentMethod_ID);

        if (!userPaymentMethod) {
          return results.create(results.UserPaymentMethodNotFoundError);
        }

        return {
          __typename: "UserPaymentMethod",
          ...userPaymentMethod.toJSON()
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    },
  ),

  userPaymentMethods: combineResolvers(
    isAuthenticated,
    async (_, { C_User_ID }, { db, results }) => {
      try {
        const paymentMethods = await db.MUserPaymentMethod.findAll({
          where: {
            C_User_ID: C_User_ID,
          },
        });

        const result = {
          __typename: "UserPaymentMethods",
          userPaymentMethods: paymentMethods.map(element => {
            return {
              __typename: "UserPaymentMethod",
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

export default userPaymentMethodQueries;
